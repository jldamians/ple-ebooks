'use strict'

/**
 * Comprobante de pago electrónico
 * @param {String} type tipo de comprobante
 * @param {String} serial serie del comprobante
 * @param {String} number número del comprobante
 * @param {moment} issuanceDate fecha de emisión del comprobante
 * @param {moment} expirationDate fecha de expiración del comprobante
 * @constructor
 */
function CPE(type, serial, number, issuanceDate, expirationDate) {
  let _args = {
    type,
    serial,
    number,
    issuanceDate,
    expirationDate,
  }

  Object.defineProperty(this, 'type', {
    get: () => { return _args.type },
  })

  Object.defineProperty(this, 'serial', {
    get: () => { return _args.serial },
  })

  Object.defineProperty(this, 'number', {
    get: () => { return _args.number },
  })

  Object.defineProperty(this, 'issuanceDate', {
    get: () => {
      const isValidIssuanceDate = (
        _args.issuanceDate != null && _args.issuanceDate.isValid()
      )

      if (isValidIssuanceDate) {
        return _args.issuanceDate.format('DD/MM/YYYY')
      } else {
        return ''
      }
    },
  })

  Object.defineProperty(this, 'expirationDate', {
    get: () => {
      const isValidExpirationDate = (
        _args.expirationDate != null && _args.expirationDate.isValid()
      )

      if (isValidExpirationDate) {
        return _args.expirationDate.format('DD/MM/YYYY')
      } else {
        return ''
      }
    },
  })
}

module.exports = CPE
