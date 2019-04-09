'use strict'

const moment = require('moment')

const Tax = require('../lib/Tax')
const CPE = require('../lib/CPE')
const Sale = require('../lib/Sale')
const Person = require('../lib/Person')
const Currency = require('../lib/Currency')

const currency = new Currency('PEN', 1.00)
const customer = new Person('6', '20547872518', 'Easy Taxi Perú S.A.C.')
const period = moment('201901', 'YYYYMM')

const eSale1 = new Sale()

eSale1.sequential = 1
eSale1.accountingPeriod = period
eSale1.regimeType = 'RER'
eSale1.cpe = new CPE('01', 'FT02', 1, moment('2019-01-04', 'YYYY-MM-DD'))
eSale1.currency = currency
eSale1.customer = customer
eSale1.exemptAmount = 38
eSale1.payableAmount = 38

const eSale2 = new Sale()

eSale2.sequential = 2
eSale2.accountingPeriod = period
eSale2.regimeType = 'RER'
eSale2.cpe = new CPE('01', 'FT02', 2, moment('2019-01-08', 'YYYY-MM-DD'))
eSale2.currency = currency
eSale2.customer = customer
eSale2.exemptAmount = 21
eSale2.payableAmount = 21

const eSale3 = new Sale()

eSale3.sequential = 3
eSale3.accountingPeriod = period
eSale3.regimeType = 'RER'
eSale3.cpe = new CPE('01', 'FT02', 3, moment('2019-01-09', 'YYYY-MM-DD'))
eSale3.currency = currency
eSale3.customer = customer
eSale3.exemptAmount = 34
eSale3.payableAmount = 34

const eSale4 = new Sale()

eSale4.sequential = 4
eSale4.accountingPeriod = period
eSale4.regimeType = 'RER'
eSale4.cpe = new CPE('07', 'FT02', 1, moment('2019-01-10', 'YYYY-MM-DD'))
eSale4.ref = new CPE('01', 'FT01', 1, moment('2018-12-01', 'YYYY-MM-DD'))
eSale4.currency = currency
eSale4.customer = customer
eSale4.igv = new Tax(10, 1.8)
eSale4.taxableAmount = 10
eSale4.payableAmount = 11.8

const eSale5 = new Sale()

eSale5.sequential = 5
eSale5.accountingPeriod = period
eSale5.regimeType = 'RER'
eSale5.cpe = new CPE('07', 'FT02', 2, moment('2019-01-10', 'YYYY-MM-DD'))
eSale5.ref = new CPE('01', 'FT01', 2, moment('2018-12-01', 'YYYY-MM-DD'))
eSale5.currency = currency
eSale5.customer = customer
eSale5.exemptAmount = 10
eSale5.payableAmount = 10

const eSale6 = new Sale()

eSale6.sequential = 6
eSale6.accountingPeriod = period
eSale6.regimeType = 'RER'
eSale6.cpe = new CPE('07', 'FT02', 3, moment('2019-01-10', 'YYYY-MM-DD'))
eSale6.ref = new CPE('01', 'FT01', 3, moment('2019-01-01', 'YYYY-MM-DD'))
eSale6.currency = currency
eSale6.customer = customer
eSale6.exemptAmount = 10
eSale6.payableAmount = 10

console.log(eSale1.getText())
console.log(eSale2.getText())
console.log(eSale3.getText())
console.log(eSale4.getText())
console.log(eSale5.getText())
console.log(eSale6.getText())


// http://orientacion.sunat.gob.pe/index.php/empresas-menu/libros-y-registros-vinculados-asuntos-tributarios-empresas/preguntas-frecuentes-libros-y-registros
