'use strict'

const moment = require('moment')

const BOOK_CODES = require('./constants/BookCodes')

const Tax = require('./Tax')
const CPE = require('./CPE')
const Book = require('./Book')
const Sale = require('./Sale')
const Person = require('./Person')
const Currency = require('./Currency')

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

SalesBook.prototype.addSale = function(payload) {
  const sale = new Sale()

  const sequential = (this.content.length + 1)

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
  sale.currency = new Currency(
    payload.currency.code,
    payload.currency.exchangeRate
  )

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
}

module.exports = SalesBook
