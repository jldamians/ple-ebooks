'use strict'

const util = require('util')

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
  NonDomiciledPurchasesBook._parent.call(this,
    taxpayerIdentityNumber,
    taxpayerRegimenCode,
    accountingPeriod,
    currencyCode,
    BOOK_CODES.nonDomiciledPurchases
  )
}

util.inherits(NonDomiciledPurchasesBook, Book)

NonDomiciledPurchasesBook.prototype.addContent = function(payload) {
  // TODO: implementar lógica
}

module.exports = NonDomiciledPurchasesBook
