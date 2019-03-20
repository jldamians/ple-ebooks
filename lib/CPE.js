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
function CPE(type, serial, number, issuanceDate, expirationDate = null) {
  let _args = {
    type,
    serial,
    number,
    issuanceDate,
    expirationDate,
  }

  // Tipo de comprobante de pago o
  // del comprobante de pago que se modifica
  Object.defineProperty(this, 'type', {
    get: () => { return _args.type },
  })

  // Serie del comprobante de pago o
  // del comprobante de pago que se modifica
  Object.defineProperty(this, 'serial', {
    get: () => { return _args.serial },
  })

  // Número del comprobante de pago o
  // del comprobante de pago que se modifica
  Object.defineProperty(this, 'number', {
    get: () => { return _args.number },
  })

  // Fecha de emisión del comprobante de pago o
  // del comprobante de pago que se modifica
  Object.defineProperty(this, 'issuanceDate', {
    get: () => {
      // TODO: validar que los demás datos ingresados (tipo, serie y número), sean correctos

      const isValidIssuanceDate = (
        _args.issuanceDate != null && _args.issuanceDate.isValid()
      )

      if (isValidIssuanceDate) {
        return _args.issuanceDate.format('DD/MM/YYYY')
      } else {
        throw new Error(
          `La fecha de emisión del CPE es incorrecta (${this.type}-${this.serial}-${this.number})`
        )
      }
    },
  })

  // Fecha de vencimiento o fecha de pago
  Object.defineProperty(this, 'expirationDate', {
    get: () => {
      // TODO: validar que los demás datos ingresados (tipo, serie y número), sean correctos
      if (_args.expirationDate != null) {
        const isValidExpirationDate = (
          _args.expirationDate != null && _args.expirationDate.isValid()
        )

        if (isValidExpirationDate) {
          return _args.expirationDate.format('DD/MM/YYYY')
        } else {
          throw new Error(
            `La fecha de expiración del CPE es incorrecta (${this.type}-${this.serial}-${this.number})`
          )
        }
      } else {
        return ''
      }
    },
  })
}

module.exports = CPE
