'use strict'

exports.fillDecimals = (number, length) => {
  if (!parseInt(number)) {
    return number
  }

  const str = String(number)

  const dot = str.lastIndexOf('.')

  const isDecimal = dot != -1

  const integer = isDecimal ? str.substr(0, dot) : str

  let decimals = isDecimal ? str.substr(dot + 1)  : ''

  decimals = _pad(decimals, length, 0)

  return `${integer}.${decimals}`
}

function _pad(input, length, padding) {
  const str = String(input)

  return length <= str.length ? str : _pad(str + padding, length, padding)
}
