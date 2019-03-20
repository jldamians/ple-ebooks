'use strict'

const SalesBook = require('../lib/SalesBook')

const saleBook = new SalesBook(
  '10094688685',
  'RER',
  '201901',
  'PEN'
)

const customer = {
  identityType: '6',
  identityNumber: '20547872518',
  name: 'Easy Taxi Perú S.A.C.'
}

const currency = {
  code: 'PEN',
  exchangeRate: 1
}

saleBook.addSale({
  cpe: {
    type: '01',
    serial: 'FT02',
    number: 1,
    issuanceDate: '2019-01-04',
    //expirationDate: null
  },
  currency,
  customer,
  exemptAmount: 38,
  payableAmount: 38
})

saleBook.addSale({
  cpe: {
    type: '01',
    serial: 'FT02',
    number: 2,
    issuanceDate: '2019-01-08',
    //expirationDate: null
  },
  currency,
  customer,
  exemptAmount: 21,
  payableAmount: 21
})

saleBook.addSale({
  cpe: {
    type: '01',
    serial: 'FT02',
    number: 3,
    issuanceDate: '2019-01-09',
    //expirationDate: null
  },
  currency,
  customer,
  exemptAmount: 34,
  payableAmount: 34
})

saleBook.addSale({
  cpe: {
    type: '07',
    serial: 'FT02',
    number: 1,
    issuanceDate: '2019-01-10',
    //expirationDate: null
  },
  ref: {
    type: '01',
    serial: 'FT01',
    number: 1,
    issuanceDate: '2018-12-01',
  },
  currency,
  customer,
  igv: {
    taxableAmount: 10.00,
    taxAmount: 1.80
  },
  taxableAmount: 10.00,
  payableAmount: 11.80
})

saleBook.addSale({
  cpe: {
    type: '07',
    serial: 'FT02',
    number: 2,
    issuanceDate: '2019-01-10',
    //expirationDate: null
  },
  ref: {
    type: '01',
    serial: 'FT01',
    number: 2,
    issuanceDate: '2018-12-01',
  },
  currency,
  customer,
  exemptAmount: 10.00,
  payableAmount: 10.00
})

saleBook.addSale({
  cpe: {
    type: '07',
    serial: 'FT02',
    number: 3,
    issuanceDate: '2019-01-10',
    //expirationDate: null
  },
  ref: {
    type: '01',
    serial: 'FT01',
    number: 3,
    issuanceDate: '2019-01-01',
  },
  currency,
  customer,
  exemptAmount: 10.00,
  payableAmount: 10.00
})

console.log(saleBook.getContent())
