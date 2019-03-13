'use strict'

/**
 * Impuesto
 * @param {String} type Código de moneda
 * @param {Number} rate Tasa de cambios a sol (S/)
 * @constructor
 */
function Currency(type, rate) {
  let _args = {
    type,
    rate,
  }

  Object.defineProperty(this, 'type', {
    get: () => { return _args.type },
  })

  Object.defineProperty(this, 'rate', {
    get: () => { return _args.rate },
  })
}

module.exports = Currency
