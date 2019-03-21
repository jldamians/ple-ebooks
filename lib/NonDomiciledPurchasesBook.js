'use strict'

const Book = require('./Book')

const BOOK_CODES = require('./constants/BookCodes')

/**
 * Permite crear un libro electrónico de compras no domiciliadas
 * @param {String} taxpayerIdentityNumber Número de RUC del contribuyente
 * @param {String} taxpayerRegimenCode Regimen del contribuyente
 * @param {String} accountingPeriod Periodo contable en formato YYYYMM
 * @param {String} currencyCode Código de regimen del contribuyente
 * @constructor
 */
function NonDomiciledPurchasesBook(taxpayerIdentityNumber, taxpayerRegimenCode, accountingPeriod, currencyCode) {
  this._super.call(this,
    taxpayerIdentityNumber,
    taxpayerRegimenCode,
    accountingPeriod,
    currencyCode,
    BOOK_CODES.nonDomiciledPurchases
  )
}

NonDomiciledPurchasesBook.prototype = Object.create(Book.prototype)
NonDomiciledPurchasesBook.prototype.constructor = NonDomiciledPurchasesBook
NonDomiciledPurchasesBook.prototype._super = Book

module.exports = NonDomiciledPurchasesBook
