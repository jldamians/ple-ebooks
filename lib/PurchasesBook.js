'use strict'

const Book = require('./Book')

const BOOK_CODES = require('./constants/BookCodes')

/**
 * Permite crear un libro electrónico de compras
 * @param {String} taxpayerIdentityNumber Número de RUC del contribuyente
 * @param {String} taxpayerRegimenCode Regimen del contribuyente
 * @param {String} accountingPeriod Periodo contable en formato YYYYMM
 * @param {String} currencyCode Código de regimen del contribuyente
 * @constructor
 */
function PurchasesBook(taxpayerIdentityNumber, taxpayerRegimenCode, accountingPeriod, currencyCode) {
  this._super.call(this,
    taxpayerIdentityNumber,
    taxpayerRegimenCode,
    accountingPeriod,
    currencyCode,
    BOOK_CODES.purchases
  )
}

PurchasesBook.prototype = Object.create(Book.prototype)
PurchasesBook.prototype.constructor = PurchasesBook
PurchasesBook.prototype._super = Book

module.exports = PurchasesBook