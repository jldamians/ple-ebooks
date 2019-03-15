'use strict'

/**
 * Impuesto
 * @param {String} code Código de moneda
 * @param {Number} exchangeRate Tasa de cambios a sol (S/)
 * @constructor
 */
function Currency(code, exchangeRate) {
  let _args = {
    code,
    exchangeRate,
  }

  // Código de la moneda
  Object.defineProperty(this, 'code', {
    get: () => { return _args.code },
  })

  // Tipo de cambio
  Object.defineProperty(this, 'exchangeRate', {
    get: () => { return _args.exchangeRate },
  })
}

module.exports = Currency
