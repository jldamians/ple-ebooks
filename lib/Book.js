'use strict'

const BookName = requiere('./BookName')

// TODO: Implementar tipo de contribuyente

/**
 * Permite crear un libro electrónico
 * @param {String} taxpayerIdentityNumber Número de RUC del contribuyente
 * @param {moment} accountingPeriod Periodo contable en formato MM/YYYY
 * @constructor
 */
function Book(
  taxpayerIdentityNumber, 
  taxpayerRegimenCode, 
  accountingPeriod, 
  currencyCode, 
  bookTypeIdentifier
) {
  let _args = {
    taxpayerIdentityNumber,
    taxpayerRegimenCode,
    accountingPeriod,
    currencyCode,
    bookTypeIdentifier,
    content: []
  }

  Object.defineProperty(this, 'taxpayerIdentityNumber', {
    get: () => { return _args.taxpayerIdentityNumber }
  })

  Object.defineProperty(this, 'taxpayerRegimenCode', {
    get: () => { return _args.taxpayerRegimenCode }
  })

  Object.defineProperty(this, 'accountingPeriod', {
    get: () => { return _args.accountingPeriod }
  })

  Object.defineProperty(this, 'currencyCode', {
    get: () => { return _args.currencyCode }
  })

  Object.defineProperty(this, 'bookTypeIdentifier', {
    get: () => { return _args.bookTypeIdentifier }
  })

  Object.defineProperty(this, 'content', {
    get: () => { return _args.content }
  })
}

Book.prototype.getBookName = function() {
  const bookContainsInformation = (
    Array.isArray(this.content) && this.content.length > 0
  )

  const bookName = new BookName(
    this.taxpayerIdentityNumber,
    this.accountingPeriod,
    this.bookTypeIdentifier,
    bookContainsInformation,
    this.currencyCode
  )

  return bookName.getText()
}

/**
 * Función para obtener el contenido del libro electrónico en Buffer
 * @access private
 * @return {Buffer} Libro electrónico en Buffer
 */
function _getContent() {
 // TODO: lógica para obtener el contenido del archivo 
}

function _createBook(path) {
  // TODO: logica para crear el archivo
}

module.exports = Book
