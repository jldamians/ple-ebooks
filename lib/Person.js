'use strict'

/**
 * Persona
 * @param {String} identityType Tipo de identidad
 * @param {String} identityNumber Número de identidad
 * @param {String} name Nombre o razón social
 * @constructor
 */
function Person(identityType, identityNumber, name) {
  let _args = {
    name,
    identityType,
    identityNumber,
  }

  Object.defineProperty(this, 'name', {
    get: () => { return _args.name },
  })

  Object.defineProperty(this, 'identityType', {
    get: () => { return _args.identityType },
  })

  Object.defineProperty(this, 'identityNumber', {
    get: () => { return _args.identityNumber },
  })
}

module.exports = Person
