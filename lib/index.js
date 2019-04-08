'use strict'

exports.constants = {
  BookCodes: require('./constants/BookCodes'),
  CurrencyCodes: require('./constants/CurrencyCodes'),
  ElectronicDocumentCodes: require('./constants/ElectronicDocumentCodes'),
}

exports.prototypes = {
  Person: require('./Person')
  // libro de ventas
  SalesBook: require('./SalesBook')
  // libro de compras
  PurchasesBook: require('./PurchasesBook')
  // libro de compras no domiciliados
  NonDomiciledPurchasesBook: require('./NonDomiciledPurchasesBook')
}
