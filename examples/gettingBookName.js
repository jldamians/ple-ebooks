'use strict'

const moment = require('moment')

const BOOK_CODES = require('../lib/constants/BookCodes')
const CURRENCY_CODES = require('../lib/constants/CurrencyCodes')

const ElectronicBookName = require('../lib/BookName')

const bookName = new ElectronicBookName(
  '10081052650',
  moment('2019-01', 'YYYY-MM'),
  BOOK_CODES.sales,
  true,
  CURRENCY_CODES.PEN
)

console.log(bookName.getText())


// http://orientacion.sunat.gob.pe/index.php/empresas-menu/libros-y-registros-vinculados-asuntos-tributarios-empresas/preguntas-frecuentes-libros-y-registros
