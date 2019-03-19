'use strict'

const BOOK_CODES = require('./constants/BookCodes')

const Book = require('./Book')
const Sale = require('./Sale')

function SalesBook(
  taxpayerIdentityNumber,
  taxpayerRegimenCode,
  accountingPeriod,
  currencyCode
) {
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

SalesBook.prototype.addSale = function(/*sale*/) {
  const sale = new Sale(
    this.accountingPeriod,
    this.taxpayerRegimenCode,
    //...
  )

  this.content.push(sale)

  /*if (sale instanceof Sale) {
    this.content.push(sale)
  } else {
    throw new Error('Wrong data type, only whole is allowed sale')
  }*/
}
