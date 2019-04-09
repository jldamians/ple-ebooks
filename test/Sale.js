'use strict'

const assert = require('assert')
const moment = require('moment')

const Tax = require('../lib/Tax')
const CPE = require('../lib/CPE')
const Sale = require('../lib/Sale')
const Person = require('../lib/Person')
const Currency = require('../lib/Currency')

describe('Prototype Sale.js', function() {
  const newCurrency = new Currency('PEN', 1.000)
  const newCustomer = new Person('6', '20547872518', 'Easy Taxi Perú S.A.C.')
  const period = moment('201901', 'YYYYMM')

  it('Should have a getText method', function() {
    assert.equal(typeof Sale.prototype, 'object')
    assert.equal(Sale.prototype.hasOwnProperty('getText'), true)
    assert.equal(typeof Sale.prototype.getText, 'function')
  })

  it('Exempt invoice (Exonerado)', function() {
    const newSale = new Sale()

    const newCPE = new CPE('01', 'F001', 1, moment('2019-01-01'))

    newSale.sequential = 1
    newSale.accountingPeriod = period
    newSale.regimeType = 'RER'
    newSale.cpe = newCPE
    newSale.currency = newCurrency
    newSale.customer = newCustomer
    newSale.exemptAmount = 100.00
    newSale.payableAmount = 100.00

    assert.equal(newSale.getText(), '20190100|1|M-RER|01/01/2019||01|F001|1||6|20547872518|EASY TAXI PERÚ S.A.C.||||||100||||||100|PEN|1|||||||1|1|')
  })

  it('Non taxable invoice (Inafecto)', function() {
    const newSale = new Sale()

    const newCPE = new CPE('01', 'F001', 2, moment('2019-01-02'))

    newSale.sequential = 2
    newSale.accountingPeriod = period
    newSale.regimeType = 'RER'
    newSale.cpe = newCPE
    newSale.currency = newCurrency
    newSale.customer = newCustomer
    newSale.nonTaxableAmount = 100.00
    newSale.payableAmount = 100.00

    assert.equal(newSale.getText(), '20190100|2|M-RER|02/01/2019||01|F001|2||6|20547872518|EASY TAXI PERÚ S.A.C.|||||||100|||||100|PEN|1|||||||1|1|')
  })

  it('Taxable invoice (Gravado)', function() {
    const newSale = new Sale()

    const newCPE = new CPE('01', 'F001', 3, moment('2019-01-03'))

    const newIGV = new Tax(100.00, 18.00)

    newSale.sequential = 3
    newSale.accountingPeriod = period
    newSale.regimeType = 'RER'
    newSale.cpe = newCPE
    newSale.currency = newCurrency
    newSale.customer = newCustomer
    newSale.igv = newIGV
    newSale.taxableAmount = 100.00
    newSale.payableAmount = 118.00

    assert.equal(newSale.getText(), '20190100|3|M-RER|03/01/2019||01|F001|3||6|20547872518|EASY TAXI PERÚ S.A.C.||100||18||||||||118|PEN|1|||||||1|1|')
  })

  it('Taxable credit note (Gravado). Invoice issued the previous period', function() {
    const newSale = new Sale()

    const newCPE = new CPE('07', 'F001', 1, moment('2019-01-01'))

    const newRef = new CPE('01', 'F001', 1, moment('2018-12-01'))

    const newIGV = new Tax(100.00, 18.00)

    newSale.sequential = 1
    newSale.accountingPeriod = period
    newSale.regimeType = 'RER'
    newSale.cpe = newCPE
    newSale.ref = newRef
    newSale.currency = newCurrency
    newSale.customer = newCustomer
    newSale.igv = newIGV
    newSale.taxableAmount = 100.00
    newSale.payableAmount = 118.00

    assert.equal(newSale.getText(), '20190100|1|M-RER|01/01/2019||07|F001|1||6|20547872518|EASY TAXI PERÚ S.A.C.|||-100||-18|||||||118|PEN|1|01/12/2018|01|F001|1|||1|1|')
  })

  it('Taxable credit note (Gravado). Invoice issued the same period', function() {
    const newSale = new Sale()

    const newCPE = new CPE('07', 'F001', 2, moment('2019-01-10'))

    const newRef = new CPE('01', 'F001', 2, moment('2019-01-05'))

    const newIGV = new Tax(100.00, 18.00)

    newSale.sequential = 1
    newSale.accountingPeriod = period
    newSale.regimeType = 'RER'
    newSale.cpe = newCPE
    newSale.ref = newRef
    newSale.currency = newCurrency
    newSale.customer = newCustomer
    newSale.igv = newIGV
    newSale.taxableAmount = 100.00
    newSale.payableAmount = 118.00

    assert.equal(newSale.getText(), '20190100|1|M-RER|10/01/2019||07|F001|2||6|20547872518|EASY TAXI PERÚ S.A.C.||100||18||||||||118|PEN|1|05/01/2019|01|F001|2|||1|1|')
  })
})
