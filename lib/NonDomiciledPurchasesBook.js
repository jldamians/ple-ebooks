'use strict'

const util = require('util')

const Book = require('./Book')

const BOOK_CODES = require('./constants/BookCodes')

/**
 * Permite crear un libro electrónico de compras no domiciliadas
 * @param {Person} taxpayer Información del contribuyente
 * @param {String} regimeType Tipo de regimen del contribuyente (RER)
 * @param {String} accountingPeriod Periodo contable (YYYYMM)
 * @param {String} currencyType Tipo de moneda (PEN)
 * @constructor
 */
function NonDomiciledPurchasesBook(
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
    BOOK_CODES.nonDomiciledPurchases
  )
}

util.inherits(NonDomiciledPurchasesBook, Book)

NonDomiciledPurchasesBook.prototype.addContent = function(payload) {
  // TODO: implementar lógica
}

module.exports = NonDomiciledPurchasesBook
