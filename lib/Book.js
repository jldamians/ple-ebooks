'use strict'

const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const moment = require('moment')

const BookName = require('./BookName')

/**
 * Permite crear un libro electrónico
 * @param {String} taxpayerIdentityType Tipo de documento de identidad del contribuyente (6)
 * @param {String} taxpayerIdentityNumber Número de documento de identidad del contribuyente (RUC)
 * @param {String} taxpayerName Nombre contribuyente
 * @param {String} taxpayerRegimeType Tipo de regimen del contribuyente (RER)
 * @param {String} accountingPeriod Periodo contable (YYYYMM)
 * @param {String} currencyType Tipo de moneda (PEN)
 * @param {String} bookType Tipo de libro electrónico
 * @constructor
 */
function Book(
  taxpayerIdentityType,
  taxpayerIdentityNumber,
  taxpayerName,
  taxpayerRegimeType,
  accountingPeriod,
  currencyType,
  bookType
) {
  let _args = {
    taxpayerIdentityType,
    taxpayerIdentityNumber,
    taxpayerName,
    taxpayerRegimeType,
    accountingPeriod,
    currencyType,
    bookType,
    content: []
  }

  Object.defineProperty(this, 'taxpayerIdentityType', {
    get: () => { return _args.taxpayerIdentityType }
  })

  Object.defineProperty(this, 'taxpayerIdentityNumber', {
    get: () => { return _args.taxpayerIdentityNumber }
  })

  Object.defineProperty(this, 'taxpayerName', {
    get: () => { return _args.taxpayerName }
  })

  Object.defineProperty(this, 'taxpayerRegimeType', {
    get: () => { return _args.taxpayerRegimeType }
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
    const bookContainsInformation = (
      Array.isArray(this.content) && this.content.length > 0
    )

    const bookName = new BookName(
      this.taxpayerIdentityNumber,
      moment(this.accountingPeriod, 'YYYYMM'),
      this.bookType,
      bookContainsInformation,
      this.currencyType
    )

    return bookName.getText()
  } catch (e) {
    throw new Error(`[${this.taxpayerIdentityNumber}] ${e.message}`)
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
    throw new Error(`[${this.taxpayerIdentityNumber}] ${e.message}`)
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

  const taxpayerDirectoryName = this.taxpayerIdentityNumber

  const digitDirectoryName = this.taxpayerIdentityNumber.substr(-1)

  const periodDirectoryName = this.accountingPeriod

  const directoryPath = (
    `/${periodDirectoryName}/${digitDirectoryName}/${taxpayerDirectoryName}/LE`
  )

  return path.join(root || ROOT_DIRECTORY_PATH, directoryPath)
}

module.exports = Book
