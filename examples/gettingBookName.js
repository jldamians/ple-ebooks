'use strict'

const moment = require('moment')

const ElectronicBookName = require('../lib/BookName')

const bookName = new ElectronicBookName(
  '10081052650',
  moment('2019-01', 'YYYY-MM'),
  '140100',
  true,
  'PEN'
)

console.log(bookName.getText())


// http://orientacion.sunat.gob.pe/index.php/empresas-menu/libros-y-registros-vinculados-asuntos-tributarios-empresas/preguntas-frecuentes-libros-y-registros
