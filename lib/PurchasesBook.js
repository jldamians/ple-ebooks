'use strict'

const Book = require('./Book')

const utils = require('./utils')

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
  PurchasesBook._parent.call(this,
    taxpayerIdentityNumber,
    taxpayerRegimenCode,
    accountingPeriod,
    currencyCode,
    BOOK_CODES.purchases
  )
}

utils.inherits(PurchasesBook, Book)

module.exports = PurchasesBook
