'use strict'

const BOOK_CODES = require('./constants/BookCodes')
const CURRENCY_CODES = require('./constants/CurrencyCodes')
const BOOK_CONTENT_TYPES = require('./constants/BookContentTypes')
const BOOK_CURRENCY_TYPES = require('./constants/BookCurrencyTypes')

/**
 * Administrar el nombre del libro electrónico
 * @param {String} taxpayerIdentityNumber Número de RUC del contribuyente
 * @param {moment} accountingPeriod Período contable
 * @param {String} bookTypeIdentifier Identificador del libro electrónico
 * @param {Boolean} bookContainsInformation Indicar de contenido del libro
 * @param {String} currencyCode Código de la moneda
 * @constructor
 */
function BookName(
  taxpayerIdentityNumber,
  accountingPeriod,
  bookTypeIdentifier,
  bookContainsInformation,
  currencyCode
) {
  let _args = {
    fixedBookIdentifier: 'LE',
    taxpayerIdentityNumber: taxpayerIdentityNumber,
    accountingPeriod: accountingPeriod,
    bookTypeIdentifier: bookTypeIdentifier,
    operationIdentifier: '1',
    bookContainsInformation: bookContainsInformation
    currencyCode: currencyCode,
    generalBookIdentifier: '1'
  }

  // 1; Identificador fijo del libro electrónico
  Object.defineProperty(this, 'fixedBookIdentifier', {
    get: () => { return _args.fixedBookIdentifier }
  })

  // 2; Número de RUC del contribuyente
  Object.defineProperty(this, 'taxpayerIdentityNumber', {
    get: () => { return _args.taxpayerIdentityNumber }
  })

  // 3 - 5; Período contable
  Object.defineProperty(this, 'accountingPeriod', {
    get: () => { return _args.accountingPeriod }
  })

  // 6; Identificador del libro
  Object.defineProperty(this, 'bookTypeIdentifier', {
    get: () => { return _args.bookTypeIdentifier }
  })

  // 8; Indicador de operaciones
  Object.defineProperty(this, 'operationIdentifier', {
    get: () => { return _args.operationIdentifier }
  })

  // 9; Indicador del contenido del libro
  Object.defineProperty(this, 'bookContainsInformation', {
    get: () => { return _args.bookContainsInformation }
  })

  // 10; Indicador de la moneda utilizada
  Object.defineProperty(this, 'currencyCode', {
    get: () => { return _args.currencyCode}
  })

  // Consignaremos '1' cuando el libro electrónico
  // sea enviado a SUNAT empleando el PLE (default)
  Object.defineProperty(this, 'generalBookIdentifier', {
    get: () => { return _args.generalBookIdentifier }
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

/**
 * Función para obtener el código de estados financieros
 * @access private
 * @return {String} Código de estados financieros
 */
function _getFinancialStatementsCode() {
  const electronicBooksAllowed = [
    BOOK_CODES.sales,
    BOOK_CODES.purchases,
    BOOK_CODES.nonDomiciledPurchases
  ]

  const withoutFinancialStatementsCode = (
    electronicBooksAllowed.includes(this.bookTypeIdentifier)
  )

  if (withoutFinancialStatementsCode === true) {
    return '00'
  } else {
    throw new Error(`Electronic books not supported (${this.bookTypeIdentifier})`)
  }
}

/**
 * Función para obtener el año del periodo contable
 * @access private
 * @return {String} Año del periodo contable
 */
function _getYearAccountingPeriod() {
  return _getAccountingPeriodInformation.bind(this)('YYYY')
}

/**
 * Función para obtener el mes del periodo contable
 * @access private
 * @return {String} Mes del periodo contable
 */
function _getMonthAccountingPeriod() {
  return _getAccountingPeriodInformation.bind(this)('MM')
}

/**
 * Función para obtener el día del periodo contable
 * @access private
 * @return {String} Día del periodo contable
 */
function _getDayAccountingPeriod() {
  return _getAccountingPeriodInformation.bind(this)('00')
}

/**
 * Función para obtener el indicador de la moneda utilizada
 * @access private
 * @return {String} Indicador de la moneda utilizada
 */
function _getCurrencyUsedIdentifier() {
  let currencyIdentifier

  switch (this.currencyCode) {
    case CURRENCY_CODES.PEN:
      currencyIdentifier = BOOK_CURRENCY_TYPES.PEN

      break;
      case CURRENCY_CODES.USD:
      currencyIdentifier = BOOK_CURRENCY_TYPES.USD

      break;
    default:
      throw new Error(`Currency type not supported (${this.currencyCode})`)
  }

  return currencyIdentifier
}

/**
 * Functión para obtener información del período
 * @access private
 * @param  {String} format Formato del valor que se desea obtener
 * @return {String} valor obtenido en base al formato
 */
function _getAccountingPeriodInformation = function(format) {
  const validAccountingPeriod = (
    this.accountingPeriod != null && this.accountingPeriod.isValid()
  )

  if (validAccountingPeriod === true) {
    return this.accountingPeriod.format(format)
  } else {
    throw new Error('Incorrect accounting period')
  }
}

/**
 * Función para obtener el indicador del contenido del libro
 * @access private
 * @return {String} Indicador del contenido del libro
 */
function _getBookContentIdentifier = function() {
  if (this.bookContainsInformation != null) {
    if (this.bookContainsInformation) {
      return BOOK_CONTENT_TYPES.full
    } else {
      return BOOK_CONTENT_TYPES.empty
    }
  } else {
    throw new Error(`Content indicator not defined (${this.bookContainsInformation})`)
  }
}

/**
 * Función para construir el nombre del libro electrónico
 * @access private
 * @return {String} Nombre del libro electrónico
 */
function _buildBookName() {
  const fixedBookIdentifier = this.fixedBookIdentifier
  const taxpayerIdentityNumber = this.taxpayerIdentityNumber
  const yearAccountingPeriod = _getYearAccountingPeriod.bind(this)()
  const monthAccountingPeriod = _getMonthAccountingPeriod.bind(this)()
  const dayAccountingPeriod = _getDayAccountingPeriod.bind(this)()
  const bookTypeIdentifier = this.bookTypeIdentifier
  const financialStatementsCode = _getFinancialStatementsCode.bind(this)()
  const operationIdentifier = this.operationIdentifier
  const bookContentIdentifier = _getBookContentIdentifier.bind(this)()
  const currencyUsedIdentifier = _getCurrencyUsedIdentifier.bind(this)()
  const generalBookIdentifier = this.generalBookIdentifier

  return [
    fixedBookIdentifier,
    taxpayerIdentityNumber,
    yearAccountingPeriod,
    monthAccountingPeriod,
    dayAccountingPeriod,
    bookTypeIdentifier,
    financialStatementsCode,
    operationIdentifier,
    bookContentIdentifier,
    currencyUsedIdentifier,
    generalBookIdentifier,
  ].join('').concat('.txt')
}

module.exports = BookName
