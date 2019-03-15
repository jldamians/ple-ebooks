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
  const bookContainsInformation = (
    Array.isArray(this.content) && this.content.length > 0
  )

  const bookName = new BookName(
    this.ruc,
    this.period,
    this.bookType,
    bookContainsInformation,
    this.currency
  )

  return bookName.getText()
}

/**
 * Función para obtener el contenido del libro electrónico en Buffer
 * @access private
 * @return {Buffer} Libro electrónico en Buffer
 */
function _getContent() {
 // TODO: logica para armar el contenido
}

function _createBook(path) {
  // TODO: logica para crear el archivo del libro electrónico
}

module.exports = Book
