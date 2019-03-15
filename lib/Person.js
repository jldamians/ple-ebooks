'use strict'

/**
 * Persona
 * @param {String} identityType Tipo de identidad
 * @param {String} identityNumber Número de identidad
 * @param {String} name Denominación
 * @constructor
 */
function Person(identityType, identityNumber, name) {
  let _args = {
    name,
    identityType,
    identityNumber,
  }

  // Apellidos y nombres, denominación o razón social del cliente
  Object.defineProperty(this, 'name', {
    get: () => { return _args.name },
  })

  // Tipo de documento de identidad
  Object.defineProperty(this, 'identityType', {
    get: () => { return _args.identityType },
  })

  // Número de documento de identidad
  Object.defineProperty(this, 'identityNumber', {
    get: () => { return _args.identityNumber },
  })
}

module.exports = Person
