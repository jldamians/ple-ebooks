'use strict'

const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const moment = require('moment')

const BookName = require('./BookName')

/**
 * Permite crear un libro electrónico
 * @param {Person} taxpayer Información del contribuyente
 * @param {String} regimeType Tipo de regimen (RER)
 * @param {String} accountingPeriod Periodo contable (YYYYMM)
 * @param {String} currencyType Tipo de moneda (PEN)
 * @param {String} bookType Tipo de libro electrónico
 * @constructor
 */
function Book(
  taxpayer,
  regimeType,
  accountingPeriod,
  currencyType,
  bookType
) {
  let _args = {
    taxpayer,
    regimeType,
    accountingPeriod,
    currencyType,
    bookType,
    content: []
  }

  Object.defineProperty(this, 'taxpayer', {
    get: () => { return _args.taxpayer }
  })

  Object.defineProperty(this, 'regimeType', {
    get: () => { return _args.regimeType }
  })

  Object.defineProperty(this, 'accountingPeriod', {
    get: () => { return _args.accountingPeriod }
  })

  Object.defineProperty(this, 'currencyType', {
    get: () => { return _args.currencyType }
  })

  Object.defineProperty(this, 'bookType', {
    get: () => { return _args.bookType }
  })

  Object.defineProperty(this, 'content', {
    get: () => { return _args.content }
  })
}

/**
 * Crear el nombre del libro electrónico
 * @function
 * @access public
 * @return {String} Nombre del libro electrónico
 */
Book.prototype.getName = function() {
  try {
    const emptyBook = (
      Array.isArray(this.content) && this.content.length > 0
    )

    const bookName = new BookName(
      this.taxpayer.identityNumber,
      moment(this.accountingPeriod, 'YYYYMM'),
      this.bookType,
      emptyBook,
      this.currencyType
    )

    return bookName.getText()
  } catch (e) {
    throw new Error(`[${this.taxpayer.identityNumber}] ${e.message}`)
  }
}

/**
 * Crear el contenido del libro electrónico
 * @function
 * @access public
 * @return {String} Contenido del libro electrónico
 */
Book.prototype.getContent = function() {
  try {
    let bookContent = []

    this.content.forEach((cpe) => {
      bookContent.push(
        cpe.getText()
      )
    })

    return bookContent.join('\n')
  } catch (e) {
    throw new Error(`[${this.taxpayer.identityNumber}] ${e.message}`)
  }
}

/**
 * Crear y almacenar el libro electrónico
 * @param  {string} root Ruta principal donde se creará el libro electrónico
 * @method
 * @access public
 */
Book.prototype.create = function(root = null) {
  const bookPath = this.getPath(root)

  const bookContent = this.getContent()

  fs.writeFileSync(bookPath, bookContent)
}

/**
 * Obtener el último dígito del número de identidad del contribuyente
 * @function
 * @access public
 * @return {String} Último dígito del número de identidad del contribuyente
 */
Book.prototype.getDigit = function() {
  return this.taxpayer.identityNumber.substr(-1)
}

/**
 * Crear la ruta completa del libro electrónico
 * @param {String} root Ruta principal donde se creará el libro electrónico
 * @function
 * @access public
 * @return {String} Ruta completa del libro electrónico
 */
Book.prototype.getPath = function(root = null) {
  const directoryPath = _getDirectoryPath.bind(this)(root)

  const fullPath = path.join(directoryPath, this.getName())

  if (!fs.existsSync(directoryPath)){
    mkdirp.sync(directoryPath);
  }

  return fullPath
}

// TODO: pasar el directorio raíz como una variable de entorno

/**
 * Crear la ruta al directorio de almacenamiento
 * @param {String} root Ruta principal donde se creará el libro electrónico
 * @function
 * @access private
 * @return {String} Ruta del directorio
 */
function _getDirectoryPath(root = null) {
  const ROOT_DIRECTORY_PATH = process.env.ROOT_DIRECTORY_PATH

  const taxpayerDirectoryName = this.taxpayer.identityNumber

  const digitDirectoryName = this.getDigit()

  const periodDirectoryName = this.accountingPeriod

  const directoryPath = (
    `/${periodDirectoryName}/${digitDirectoryName}/${taxpayerDirectoryName}/LE`
  )

  return path.join(root || ROOT_DIRECTORY_PATH, directoryPath)
}

module.exports = Book
