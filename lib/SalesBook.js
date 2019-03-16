'use strict'

const BOOK_CODES = require('./constants/BookCodes')

const Book = require('./Book')
const Sale = require('./Sale')

function SalesBook(taxpayerIdentityNumber, accountingPeriod, currencyCode) {
  this._super.call(this,
    taxpayerIdentityNumber,
    accountingPeriod,
    currencyCode,
    BOOK_CODES.sales
  )
}

SalesBook.prototype = Object.create(Book.prototype)
SalesBook.prototype.constructor = SalesBook
SalesBook.prototype._super = Book

SalesBook.prototype.add = function(sale) {
  if (sale instanceof Sale) {

  } else {
    throw new Error('')
  }
}
