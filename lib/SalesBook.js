'use strict'

const moment = require('moment')

const BOOK_CODES = require('./constants/BookCodes')

const Tax = require('./Tax')
const CPE = require('./CPE')
const Book = require('./Book')
const Sale = require('./Sale')
const Person = require('./Person')
const Currency = require('./Currency')

/**
 * Permite crear un libro electrónico de ventas
 * @param {String} taxpayerIdentityNumber Número de RUC del contribuyente
 * @param {String} taxpayerRegimenCode Regimen del contribuyente
 * @param {String} accountingPeriod Periodo contable en formato YYYYMM
 * @param {String} currencyCode Código de regimen del contribuyente
 * @constructor
 */
function SalesBook(taxpayerIdentityNumber, taxpayerRegimenCode, accountingPeriod, currencyCode) {
  this._super.call(this,
    taxpayerIdentityNumber,
    taxpayerRegimenCode,
    accountingPeriod,
    currencyCode,
    BOOK_CODES.sales
  )
}

SalesBook.prototype = Object.create(Book.prototype)
SalesBook.prototype.constructor = SalesBook
SalesBook.prototype._super = Book

/**
 * Agregar ventas al libro electrónico
 * @access public
 * @param  {Object} payload Información de la venta
 */
SalesBook.prototype.addSale = function(payload) {
  const sale = new Sale()

  const sequential = (this.content.length + 1)

  const ID = (
    `${payload.cpe.type}-${payload.cpe.serial}-${payload.cpe.number}`
  )

  try {
    // correlativo del mes
    sale.sequential = sequential

    // periodo contable actual
    sale.accountingPeriod = moment(this.accountingPeriod, 'YYYYMM')

    // regimen laboral del contribuyente
    sale.taxpayerRegimenCode = this.taxpayerRegimenCode

    // cpe
    sale.cpe = new CPE(
      payload.cpe.type,
      payload.cpe.serial,
      payload.cpe.number,
      moment(payload.cpe.issuanceDate, 'YYYY-MM-DD'),
      payload.cpe.expirationDate != null ? moment(payload.cpe.expirationDate, 'YYYY-MM-DD') : null
    )

    // moneda de pago
    if (this.currencyCode === payload.currency.code) {
      sale.currency = new Currency(
        payload.currency.code,
        payload.currency.exchangeRate
      )
    } else {
      throw new Error(
        `La moneda del CPE (${payload.currency.code}) y del libro de ventas (${this.currencyCode}) son diferentes`
      )
    }

    // cliente o receptor
    sale.customer = new Person(
      payload.customer.identityType,
      payload.customer.identityNumber,
      payload.customer.name
    )

    // cpe referencial
    if (payload.hasOwnProperty('ref')) {
      sale.ref = new CPE(
        payload.ref.type,
        payload.ref.serial,
        payload.ref.number,
        moment(payload.ref.issuanceDate, 'YYYY-MM-DD')
      )
    }

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
    throw new Error(`[${this.taxpayerIdentityNumber}] [${ID}] ${e.message}`)
  }
}

module.exports = SalesBook
