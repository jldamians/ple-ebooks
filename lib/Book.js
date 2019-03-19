'use strict'

const BookName = require('./BookName')

/**
 * Permite crear un libro electrónico
 * @param {String} taxpayerIdentityNumber Número de RUC del contribuyente
 * @param {String} taxpayerRegimenCode Regimen del contribuyente
 * @param {moment} accountingPeriod Periodo contable en formato YYYYMM
 * @param {String} currencyCode Código de regimen del contribuyente
 * @param {String} bookTypeIdentifier Código de libro electrónico
 * @constructor
 */
function Book(taxpayerIdentityNumber, taxpayerRegimenCode, accountingPeriod, currencyCode, bookTypeIdentifier) {
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

/**
 * Función para obtener el nombre del libro electrónico
 * @access public
 * @return {String} nombre del libro electrónico
 */
Book.prototype.getName = function() {
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
Book.prototype.getContent = function() {
  let bookContent = []

  this.content.forEach((cpe) => {
    bookContent.push(
      cpe.getText()
    )
  })

  return bookContent.join('\n')
}

module.exports = Book
