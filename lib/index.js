'use strict'

const SalesBook = require('./SalesBook')
const PurchasesBook = require('./PurchasesBook')
const NonDomiciledPurchasesBook = require('./NonDomiciledPurchasesBook')

module.exports = function(taxpayerIdentityNumber, taxpayerRegimenCode, accountingPeriod, currencyCode) {
  return {
    // crear instancia del libro de ventas
    SalesBook: () => {
      return new SalesBook(
        taxpayerIdentityNumber,
        taxpayerRegimenCode,
        accountingPeriod,
        currencyCode
      )
    },
    // crear instancia del libro de compras
    PurchasesBook: () => {
      return new PurchasesBook(
        taxpayerIdentityNumber,
        taxpayerRegimenCode,
        accountingPeriod,
        currencyCode
      )
    },
    // crear instancia del libro de compras no domiciliadas
    NonDomiciledPurchasesBook: () => {
      return new NonDomiciledPurchasesBook(
        taxpayerIdentityNumber,
        taxpayerRegimenCode,
        accountingPeriod,
        currencyCode
      )
    }
  }
}
