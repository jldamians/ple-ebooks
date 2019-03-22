'use strict'

const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const moment = require('moment')

const BookName = require('./BookName')

/**
 * Permite crear un libro electrónico
 * @param {String} taxpayerIdentityNumber Número de RUC del contribuyente
 * @param {String} taxpayerRegimenCode Regimen del contribuyente
 * @param {String} accountingPeriod Periodo contable en formato YYYYMM
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
      this.bookTypeIdentifier,
      bookContainsInformation,
      this.currencyCode
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
 * @function
 * @access public
 * @return {String} Ruta completa del libro electrónico
 */
Book.prototype.create = function(root) {
  const directoryPath = _getDirectoryPath.bind(this)(root)

  const fullPath = path.join(directoryPath, this.getName())

  if (!fs.existsSync(directoryPath)){
    mkdirp.sync(directoryPath);
  }

  fs.writeFileSync(fullPath, this.getContent())

  return fullPath
}

// TODO: pasar el directorio raíz como una variable de entorno

/**
 * Crear la ruta al directorio de almacenamiento
 * @function
 * @access private
 * @return {String} Ruta del directorio
 */
function _getDirectoryPath(root) {
  const taxpayerDirectoryName = this.taxpayerIdentityNumber

  const digitDirectoryName = taxpayerDirectoryName.substr(-1)

  const periodDirectoryName = this.accountingPeriod

  const directoryPath = (
    `/${periodDirectoryName}/${digitDirectoryName}/${taxpayerDirectoryName}/LE`
  )

  return path.join(root, directoryPath)
}

module.exports = Book
