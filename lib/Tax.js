'use strict'

/**
 * Impuesto
 * @param {Number} taxableAmount Base imponible
 * @param {Number} taxAmount Importe del impuesto
 * @constructor
 */
function Tax(taxableAmount, taxAmount) {
  let _args = {
    taxableAmount,
    taxAmount,
  }

  // Base imponible
  Object.defineProperty(this, 'taxableAmount', {
    get: () => { return _args.taxableAmount },
  })

  // Importe del impuesto
  Object.defineProperty(this, 'taxAmount', {
    get: () => { return _args.taxAmount },
  })
}

module.exports = Tax
