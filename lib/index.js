'use strict'

// libro de ventas
exports.SalesBook = require('./SalesBook')
// libro de compras
exports.PurchasesBook = require('./PurchasesBook')
// libro de compras no domiciliados
exports.NonDomiciledPurchasesBook = require('./NonDomiciledPurchasesBook')

exports.constants = {
  BookCodes: require('./constants/BookCodes')
}
