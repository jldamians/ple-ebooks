'use strict'

const CURRENCY_CODES = require('./constants/CurrencyCodes')
const BOOK_CONTENT_TYPES = require('./constants/BookContentTypes')
const BOOK_CURRENCY_TYPES = require('./constants/BookCurrencyTypes')

const BookName = requiere('./BookName')

/**
 * Permite crear un libro electrónico
 * @param {String} ruc Número de RUC del contribuyente
 * @param {moment} period Periodo contable en formato MM/YYYY
 * @constructor
 */
function Book(ruc, period, currency) {
  let _args = {
    ruc,
    period,
    currency,
    content: [],
    bookType: null
  }

  Object.defineProperty(this, 'ruc', {
    get: () => { return _args.ruc }
  })

  Object.defineProperty(this, 'period', {
    get: () => { return _args.period }
  })

  Object.defineProperty(this, 'currency', {
    get: () => { return _args.currency }
  })

  Object.defineProperty(this, 'content', {
    get: () => { return _args.content },
    set: (value) => { _args.content = value }
  })

  Object.defineProperty(this, 'bookType', {
    get: () => { return _args.bookType },
    set: (value) => { _args.bookType = value }
  })
}

Book.prototype.getBookName = function() {
  const bookName = new BookName()

  // bookName.fixedBookIdentifier = 'LE' // default

  bookName.taxpayerIdentityNumber = this.ruc

  bookName.yearAccountingPeriod = this.period.format('YYYY')

  bookName.monthAccountingPeriod = this.period.format('MM')

  //bookName.dayAccountingPeriod = this.period.format('00')

  bookName.bookTypeIdentifier = this.bookType

  // bookName.financialStatementsCode = '00' // default

  // bookName.operationIdentifier = '1' // default

  bookName.bookContentIdentifier = _getBookContentIdentifier.bind(this)()

  bookName.currencyUsedIdentifier = _getCurrencyUserIdentifier.bind(this)()

  // bookName.generalBookIdentifier = '1' // default

  return bookName.getText()
}

/**
 * Función para obtener el indicador del contenido del libro
 * @access private
 * @return {String} Indicador del contenido del libro
 */
function _getBookContentIdentifier() {
  const emptyElectronicBook = (
    Array.isArray(this.content) && this.content.length > 0
  )

  if (emptyElectronicBook) {
    return BOOK_CONTENT_TYPES.empty
  } else {
    return BOOK_CONTENT_TYPES.full
  }
}

/**
 * Función para obtener el indicador de la moneda utilizada
 * @access private
 * @return {String} Indicador de la moneda utilizada
 */
function _getCurrencyUserIdentifier() {
  let currencyIdentifier

  switch (this.currency) {
    case CURRENCY_CODES.PEN:
      currencyIdentifier = BOOK_CURRENCY_TYPES.PEN

      break;
      case CURRENCY_CODES.USD:
      currencyIdentifier = BOOK_CURRENCY_TYPES.USD

      break;
    default:
      currencyIdentifier = BOOK_CURRENCY_TYPES.OTH
  }

  return currencyIdentifier
}

module.exports = Book
