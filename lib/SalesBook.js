'use strict'

const Joi = require('joi')
const util = require('util')
const moment = require('moment')

const Tax = require('./Tax')
const CPE = require('./CPE')
const Book = require('./Book')
const Sale = require('./Sale')
const Person = require('./Person')
const Currency = require('./Currency')

const BOOK_CODES = require('./constants/BookCodes')
const CURRENCY_CODES = require('./constants/CurrencyCodes')
const ELECTRONIC_DOCUMENT_CODES = require('./constants/ElectronicDocumentCodes')

/**
 * Permite crear un libro electrónico de ventas
 * @param {Person} taxpayer Información del contribuyente
 * @param {String} regimeType Tipo de regimen del contribuyente (RER)
 * @param {String} accountingPeriod Periodo contable (YYYYMM)
 * @param {String} currencyType Tipo de moneda (PEN)
 * @constructor
 */
function SalesBook(
  taxpayer,
  regimeType,
  accountingPeriod,
  currencyType
) {
  Book.bind(this)(
    taxpayer,
    regimeType,
    accountingPeriod,
    currencyType,
    BOOK_CODES.sales
  )
}

util.inherits(SalesBook, Book)

/**
 * Agregar ventas al libro electrónico
 * @method
 * @access public
 * @param  {Object} payload Información de la venta
 */
SalesBook.prototype.addContent = function(payload) {
  try {
    const result = Joi.validate(payload, _getValidationSchema())

    if (result.error) {
      throw new Error(result.error.message)
    }
  } catch(e) {
    throw new Error(`[${this.taxpayer.identityNumber}] Errores de validación: ${e.message}`)
  }

  const ID = (
    `${payload.cpe.type}-${payload.cpe.serial}-${payload.cpe.number}`
  )

  try {
    const sale = new Sale()

    const sequential = (this.content.length + 1)

    // correlativo del mes
    sale.sequential = sequential

    // periodo contable actual
    sale.accountingPeriod = moment(this.accountingPeriod, 'YYYYMM')

    // regimen laboral del contribuyente
    sale.regimeType = this.regimeType

    // cpe
    sale.cpe = new CPE(
      payload.cpe.type,
      payload.cpe.serial,
      payload.cpe.number,
      moment(payload.cpe.issuanceDate, 'YYYY-MM-DD'),
      payload.cpe.expirationDate != null ? moment(payload.cpe.expirationDate, 'YYYY-MM-DD') : null
    )

    // moneda de pago
    if (this.currencyType === payload.currency.code) {
      sale.currency = new Currency(
        payload.currency.code,
        payload.currency.exchangeRate
      )
    } else {
      throw new Error(
        `La moneda del CPE (${payload.currency.code}) y del libro electrónico de ventas (${this.currencyCode}) son diferentes`
      )
    }

    // cpe referencial
    if (payload.hasOwnProperty('ref')) {
      sale.ref = new CPE(
        payload.ref.type,
        payload.ref.serial,
        payload.ref.number,
        moment(payload.ref.issuanceDate, 'YYYY-MM-DD')
      )
    }

    // cliente o receptor
    sale.customer = new Person(
      payload.customer.identityType,
      payload.customer.identityNumber,
      payload.customer.name
    )

    // impuesto igv
    if (payload.hasOwnProperty('igv')) {
      sale.igv = new Tax(
        payload.igv.taxableAmount,
        payload.igv.taxAmount
      )
    }

    // impuesto isc
    if (payload.hasOwnProperty('isc')) {
      sale.isc = new Tax(
        payload.isc.taxableAmount,
        payload.isc.taxAmount
      )
    }

    // impuesto ivap
    if (payload.hasOwnProperty('ivap')) {
      sale.ivap = new Tax(
        payload.ivap.taxableAmount,
        payload.ivap.taxAmount
      )
    }

    // importe gravado
    if (payload.hasOwnProperty('taxableAmount')) {
      sale.taxableAmount = payload.taxableAmount
    }

    // importe exportación
    if (payload.hasOwnProperty('exportAmount')) {
      sale.exportAmount = payload.exportAmount
    }

    // importe exonerado
    if (payload.hasOwnProperty('exemptAmount')) {
      sale.exemptAmount = payload.exemptAmount
    }

    // importe inafecto
    if (payload.hasOwnProperty('nonTaxableAmount')) {
      sale.nonTaxableAmount = payload.nonTaxableAmount
    }

    // importe otros cargos
    if (payload.hasOwnProperty('otherChargesAmount')) {
      sale.otherChargesAmount = payload.otherChargesAmount
    }

    // importe total
    if (payload.hasOwnProperty('payableAmount')) {
      sale.payableAmount = payload.payableAmount
    }

    this.content.push(sale)
  } catch (e) {
    throw new Error(`[${this.taxpayer.identityNumber}] [${ID}] ${e.message}`)
  }
}

/**
 * Crear esquema de validación de datos
 * @access private
 * @return {JoiSchema} Esquema de validación
 */
function _getValidationSchema() {
  let documentSchema = Joi.object().keys({
    serial: Joi.string().regex(/^[FB][A-Za-z0-9]{2}[0-9]{1}$/).min(4).max(4).required(),
    number: Joi.number().integer().min(1).required(),
    issuanceDate: Joi.date().iso().required(),
    expirationDate: Joi.date().iso().default(null)
  })

  const cpeSchema = documentSchema.keys({
    type: Joi.string().valid([
      ELECTRONIC_DOCUMENT_CODES.invoice,
      ELECTRONIC_DOCUMENT_CODES.debitNote,
      ELECTRONIC_DOCUMENT_CODES.creditNote,
      ELECTRONIC_DOCUMENT_CODES.saleTicket
    ])
  })

  const refSchema = documentSchema.keys({
    type: Joi.string().valid([
      ELECTRONIC_DOCUMENT_CODES.invoice,
      ELECTRONIC_DOCUMENT_CODES.saleTicket
    ])
  })

  const currencySchema = Joi.object().keys({
    code: Joi.string().valid([
      CURRENCY_CODES.PEN,
      CURRENCY_CODES.USD
    ]),
    exchangeRate: Joi.alternatives()
      .when('code', {
        is: CURRENCY_CODES.PEN,
        then: Joi.number().valid(1).required()
      })
      .when('code', {
        is: CURRENCY_CODES.USD,
        then: Joi.number().min(1).precision(2).required()
      })
  })

  // TODO: Implementar constantes para los tipos de documentos de identidad

  const customerSchema = Joi.object().keys({
    identityType: Joi.string().valid(['6']).required(),
    identityNumber: Joi.string().regex(/^[0-9]{11}$/).required(),
    name: Joi.string().max(100).required()
  })

  const taxSchema = Joi.object().keys({
    taxAmount: Joi.number().positive().precision(2).required(),
    taxableAmount: Joi.number().positive().precision(2).required()
  })

  return Joi.object().keys({
    cpe: cpeSchema.required(),
    ref: refSchema.when(Joi.ref('cpe.type'), {
      is: Joi.any().valid([
        ELECTRONIC_DOCUMENT_CODES.debitNote,
        ELECTRONIC_DOCUMENT_CODES.creditNote
      ]),
      then: Joi.any().required(),
      otherwise: Joi.any().forbidden()
    }),
    currency: currencySchema.required(),
    customer: customerSchema.required(),
    igv: taxSchema,
    isc: taxSchema,
    ivap: taxSchema,
    taxableAmount: Joi.number().positive().precision(2),
    exportAmount: Joi.number().positive().precision(2),
    exemptAmount: Joi.number().positive().precision(2),
    nonTaxableAmount: Joi.number().positive().precision(2),
    otherChargesAmount: Joi.number().positive().precision(2),
    payableAmount: Joi.number().positive().precision(2).required()
  }).or('taxableAmount', 'exportAmount', 'exemptAmount', 'nonTaxableAmount')
}

module.exports = SalesBook
