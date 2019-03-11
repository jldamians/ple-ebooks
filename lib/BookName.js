'use strict'

const BOOK_NAME_ORDER = [
  // NOTE: Identificador fijo del Libro Electrónico (LE),
  // será colocado al inicio del nombre del archivo
  'fixedBookIdentifier',
  // NOTE: RUC del deudor tributario
  'taxpayerIdentityNumber',
  'yearAccountingPeriod',
  'monthAccountingPeriod',
  // NOTE: Aplica al libro de inventarios y balances, para los demás consignar '00'
  'dayAccountingPeriod',
  // NOTE: Identificador del libro,
  // códigos del tipo de Libro Electrónico (LE)
  // [140100] REGISTRO DE VENTAS E INGRESOS
  // [080100] REGISTRO DE COMPRAS
  // [080200] REGISTRO DE COMPRAS - INFORMACIÓN DE OPERACIONES CON SUJETOS NO DOMICILIADOS
  'bookTypeIdentifier',
  // NOTE: Código de oportunidad de presentación de los Estados Financieros (EEFF),
  // aplica al libro de inventarios y balances, para los demás consignar '00'
  'financialStatementsCode',
  'operationIdentifier',
  // Indicardor del contenido del libro o registro
  // [1] Con información
  // [0] Sin información
  'bookContentIdentifier',
  // Indicador de la moneda utilizada
  // [1] Moneda peruana (Nuevos soles)
  // [2] Moneda extranjera (US dólares)
  // [9] Otra moneda (Especificar)
  'currencyUsedIdentifier',
  // [1] Generado por PLE (Fijo)
  'generalBookIdentifier'
]

function BookName(
  /*fixedBookIdentifier,
  taxpayerIdentityNumber,
  yearAccountingPeriod,
  monthAccountingPeriod,
  dayAccountingPeriod,
  bookTypeIdentifier,
  financialStatementsCode,
  operationIdentifier,
  bookContentIdentifier
  currencyUsedIdentifier,
  generalBookIdentifier*/
) {
  let _args = {
    fixedBookIdentifier: null,
    taxpayerIdentityNumber: null,
    yearAccountingPeriod: null,
    monthAccountingPeriod: null,
    dayAccountingPeriod: null,
    bookTypeIdentifier: null,
    financialStatementsCode: null,
    operationIdentifier: null,
    bookContentIdentifier: null
    currencyUsedIdentifier: null,
    generalBookIdentifier: null
  }

  Object.defineProperty(this, 'fixedBookIdentifier', {
    get: () => { return _args.fixedBookIdentifier || 'LE' },
    set: (value) => { _args.fixedBookIdentifier = value }
  })

  Object.defineProperty(this, 'taxpayerIdentityNumber', {
    get: () => { return _args.taxpayerIdentityNumber },
    set: (value) => { _args.taxpayerIdentityNumber = value }
  })

  Object.defineProperty(this, 'yearAccountingPeriod', {
    get: () => { return _args.yearAccountingPeriod },
    set: (value) => { _args.yearAccountingPeriod = value }
  })

  Object.defineProperty(this, 'monthAccountingPeriod', {
    get: () => { return _args.monthAccountingPeriod },
    set: (value) => { _args.monthAccountingPeriod = value }
  })

  Object.defineProperty(this, 'dayAccountingPeriod', {
    get: () => { return _args.dayAccountingPeriod || '00' },
    set: (value) => { _args.dayAccountingPeriod = value }
  })

  Object.defineProperty(this, 'bookTypeIdentifier', {
    get: () => { return _args.bookTypeIdentifier },
    set: (value) => { _args.bookTypeIdentifier = value }
  })

  Object.defineProperty(this, 'financialStatementsCode', {
    get: () => { return _args.financialStatementsCode || '00' },
    set: (value) => { _args.financialStatementsCode = value }
  })

  Object.defineProperty(this, 'operationIdentifier', {
    get: () => { return _args.operationIdentifier || '1' },
    set: (value) => { _args.operationIdentifier = value }
  })

  Object.defineProperty(this, 'bookContentIdentifier', {
    get: () => { return _args.bookContentIdentifier },
    set: (value) => { _args.bookContentIdentifier = value }
  })

  Object.defineProperty(this, 'currencyUsedIdentifier', {
    get: () => { return _args.currencyUsedIdentifier},
    set: (value) => { _args.currencyUsedIdentifier = value }
  })

  Object.defineProperty(this, 'generalBookIdentifier', {
    get: () => { return _args.generalBookIdentifier || '1' },
    set: (value) => { _args.generalBookIdentifier = value }
  })
}

/**
 * Función para obtener el nombre del libro electrónico
 * @access public
 * @return {String} Nombre del libro electrónico
 */
BookName.prototype.getText = function() {
  return _buildBookName.bind(this)()
}

BookName.BOOK_NAME_ORDER = BOOK_NAME_ORDER

/**
 * Función para construir el nombre del libro electrónico
 * @access private
 * @return {String} Nombre del libro electrónico
 */
function _buildBookName() {
  let information = []

  information = this.BOOK_NAME_ORDER.map((element) => {
    return this[element]
  })

  return information.join('').concat('.txt')
}

module.exports = BookName
