'use strict'

const moment = require('moment')

const TAXPAYER_REGIMEN_CODES = require('./constants/TaxpayerRegimenCodes')
const ELECTRONIC_DOCUMENT_CODES = require('./constants/ElectronicDocumentCodes')

function Sale() {
  let _args = {}

  // Secuencial
  Object.defineProperty(this, 'sequential', {
    get: () => { return _args.sequential },
    set: (value) => { _args.sequential = value }
  })

  // Período contable
  Object.defineProperty(this, 'accountingPeriod', {
    // Obtener periodo contable en formato YYYYMM00
    get: () => { return _args.accountingPeriod.format('YYYYMM00') },
    set: (value) => { _args.accountingPeriod = value }
  })

  // Régimen del contribuyente
  Object.defineProperty(this, 'regimeType', {
    get: () => { return _args.regimeType },
    set: (value) => { _args.regimeType = value }
  })

  /**
   * Comprobante de pago
   * - Tipo
   * - Serie
   * - Número
   * - Fecha de emisión
   * - Fecha de vencimiento o fecha de pago
   */
  Object.defineProperty(this, 'cpe', {
    /**
     * @return {CPE} comprobante
     */
    get: () => { return _args.cpe },
    set: (value) => { _args.cpe = value }
  })

  /**
   * Moneda
   * - Código
   * - Tipo de cambio
   */
  Object.defineProperty(this, 'currency', {
    /**
     * @return {Currency} moneda
     */
    get: () => { return _args.currency },
    set: (value) => { _args.currency = value }
  })

  /**
   * Comprobante de pago que se modifica
   * - Tipo
   * - Serie
   * - Número
   * - Fecha de emisión
   */
  Object.defineProperty(this, 'ref', {
    /**
     * @return {CPE} referencia
     */
    get: () => { return _args.ref },
    set: (value) => { _args.ref = value }
  })

  Object.defineProperty(this, 'finalNumber', {
    get: () => { return _args.finalNumber || '' },
    set: (value) => { _args.finalNumber = value }
  })

  /**
   * Cliente
   * - Tipo de identidad
   * - Número de identidad
   * - Denominación
   */
  Object.defineProperty(this, 'customer', {
    /**
     * @return {Person} cliente
     */
    get: () => { return _args.customer },
    /**
     * @param {Person} value cliente
     */
    set: (value) => { _args.customer = value }
  })

  /**
   * Impuesto general a la venta (IGV)
   * - Base imponible del IGV
   * - Importe del IGV
   */
  Object.defineProperty(this, 'igv', {
    /**
     * @return {Tax} IGV
     */
    get: () => { return _args.igv },
    /**
     * @param {Tax} value IGV
     */
    set: (value) => { _args.igv = value }
  })

  /**
   * Impuesto selectivo al consumo (ISC)
   * - Base imponible del ISC
   * - Importe del ISC
   */
  Object.defineProperty(this, 'isc', {
    /**
     * @return {Tax} ISC
     */
    get: () => { return _args.isc },
    /**
     * @param {Tax} value ISC
     */
    set: (value) => { _args.isc = value }
  })

  /**
   * Impuesto a la venta de arroz pilado (IVAP)
   * - Base imponible del IVAP
   * - Importe del IVAP
   */
  Object.defineProperty(this, 'ivap', {
    /**
     * @return {Tax} IVAP
     */
    get: () => { return _args.ivap },
    /**
     * @param {Tax} value IVAP
     */
    set: (value) => { _args.ivap = value }
  })

  // Base imponible de la operación gravada
  Object.defineProperty(this, 'taxableAmount', {
    get: () => { return _args.taxableAmount || '' },
    set: (value) => { _args.taxableAmount = value }
  })

  // Valor facturado de la exportación
  Object.defineProperty(this, 'exportAmount', {
    get: () => { return _args.exportAmount || '' },
    set: (value) => { _args.exportAmount = value }
  })

  // Importe total de la operación exonerada
  Object.defineProperty(this, 'exemptAmount', {
    get: () => { return _args.exemptAmount || '' },
    set: (value) => { _args.exemptAmount = value }
  })

  // Importe total de la operación inafecta
  Object.defineProperty(this, 'nonTaxableAmount', {
    get: () => { return _args.nonTaxableAmount || '' },
    set: (value) => { _args.nonTaxableAmount = value }
  })

  // Otros conceptos, tributos y cargos
  Object.defineProperty(this, 'otherChargesAmount', {
    get: () => { return _args.otherChargesAmount || '' },
    set: (value) => { _args.otherChargesAmount = value }
  })

  // Importe total del comprobante de pago
  Object.defineProperty(this, 'payableAmount', {
    get: () => { return _args.payableAmount || '' },
    set: (value) => { _args.payableAmount = value }
  })

  // Identificación del contrato o del proyecto
  Object.defineProperty(this, 'contractIdentification', {
    get: () => { return _args.contractIdentification || '' },
  })

  // Inconsistencia en el tipo de cambio
  Object.defineProperty(this, 'exchangeRateInconsistency', {
    get: () => { return _args.exchangeRateInconsistency || '' },
  })

  // Indicador de comprobantes de pagos cancelados con  los medios
  // de pago definidos en la "Tabla 1 - Tipo de Medio de Pago"
  // NOTE: Los conductores realizan el cobro por "Transferencia de Fondos"
  // TODO: Implementar funcionalidad para recibir el tipo de medio de pago
  Object.defineProperty(this, 'authorizedPaymentMethod', {
    get: () => { return _args.authorizedPaymentMethod || '1' },
  })
}

/**
 * Función para obtener la información formateada para consignar en el libro
 * @access public
 * @return {String} Información formateada para consignar en el libro
 */
Sale.prototype.getText = function() {
  try {
    return _buildSale.bind(this)()
  } catch (e) {
    const ID = (
      `${this.cpe.type}-${this.cpe.serial}-${this.cpe.number}`
    )

    throw new Error(`[${ID}] ${e.message}`)
  }
}

/**
 * Función para formatear la información que será consignada en el libro
 * @access private
 * @return {String} Información que será consignada en el libro
 */
function _buildSale() {
  const accountingPeriod = this.accountingPeriod
  const cuo = _getCuo.bind(this)()
  const accountingEntryNumber = _getAccountingEntryNumber.bind(this)()
  const cpeIssuanceDate = this.cpe.issuanceDate
  const cpeExpirationDate = this.cpe.expirationDate
  const cpeType = this.cpe.type
  const cpeSerial = this.cpe.serial
  const cpeNumber = this.cpe.number
  const finalNumber = ''
  const customerIdentityType = this.customer.identityType
  const customerIdentityNumber = this.customer.identityNumber
  const customerName = this.customer.name
  const exportAmount = this.exportAmount
  const taxableAmount = _getTaxableAmount.bind(this)()
  const taxableAmountDiscount = _getTaxableAmountDiscount.bind(this)()
  const taxAmount = _getTaxAmount.bind(this)()
  const taxAmountDiscount = _getTaxAmountDiscount.bind(this)()
  const exemptAmount = this.exemptAmount
  const nonTaxableAmount = this.nonTaxableAmount
  const iscTaxAmount = this.isc ? this.isc.taxAmount : ''
  const ivapTaxableAmount = this.ivap ? this.ivap.taxableAmount : ''
  const ivapTaxAmount = this.ivap ? this.ivap.taxAmount : ''
  const otherChargesAmount = this.otherChargesAmount
  const payableAmount = this.payableAmount
  const currencyCode = this.currency.code
  const currencyExchangeRate = this.currency.exchangeRate
  const refIssuanceDate = this.ref ? this.ref.issuanceDate : ''
  const refType = this.ref ? this.ref.type : ''
  const refSerial = this.ref ? this.ref.serial : ''
  const refNumber = this.ref ? this.ref.number : ''
  const contractIdentification = this.contractIdentification
  const exchangeRateInconsistency = this.exchangeRateInconsistency
  const authorizedPaymentMethod = this.authorizedPaymentMethod
  const annotationOpportunityStatus = _getAnnotationOpportunityStatus.bind(this)()

  return [
    accountingPeriod,
    cuo,
    accountingEntryNumber,
    cpeIssuanceDate,
    cpeExpirationDate,
    cpeType,
    cpeSerial,
    cpeNumber,
    finalNumber,
    customerIdentityType,
    customerIdentityNumber,
    customerName,
    exportAmount,
    taxableAmount,
    taxableAmountDiscount,
    taxAmount,
    taxAmountDiscount,
    exemptAmount,
    nonTaxableAmount,
    iscTaxAmount,
    ivapTaxableAmount,
    ivapTaxAmount,
    otherChargesAmount,
    payableAmount,
    currencyCode,
    currencyExchangeRate,
    refIssuanceDate,
    refType,
    refSerial,
    refNumber,
    contractIdentification,
    exchangeRateInconsistency,
    authorizedPaymentMethod,
    annotationOpportunityStatus,
  ].join('|').concat('|')
}

/**
 * Función para obtener el número correlativo del mes o código único de la operación
 * @access private
 * @return {String} Código único de la operación
 */
function _getCuo() {
  // Los contribuyentes sujetos al RER, deberán
  // consignar el número correlativo del mes
  if (this.regimeType === TAXPAYER_REGIMEN_CODES.special) {
    return this.sequential
  } else {
    throw new Error(`El regimen consignado (${this.regimeType}) no está soportado`)
  }
}

/**
 * Función para obtener el número correlativo del asiento contable
 * @access private
 * @return {String} Número correlativo del asiento contable
 */
function _getAccountingEntryNumber() {
  // Los contribuyentes sujetos al RER, deberán
  // consignar el valor 'M-RER'
  if (this.regimeType === TAXPAYER_REGIMEN_CODES.special) {
    return 'M-RER'
  } else {
    throw new Error(`El regimen consignado (${this.regimeType}) no está soportado`)
  }
}

/**
 * Función para obtener el estado que identifica la oportunidad de anotación
 * @access private
 * @return {String} estado de oportunidad de anotación
 */
function _getAnnotationOpportunityStatus() {
  const cpeIssuanceDate = moment(this.cpe.issuanceDate, 'DD/MM/YYYY')

  const cpeAccountingPeriod = moment(this.accountingPeriod, 'YYYYMM00')

  if (!cpeIssuanceDate.isValid()) {
    throw new Error('La fecha de emisión del CPE es incorrecta')
  }

  const issuedInsideAccountingPeriod = cpeAccountingPeriod.isSame(cpeIssuanceDate, 'month')

  if (issuedInsideAccountingPeriod) {
    return '1'
  } else {
    throw new Error(
      `La fecha de emisión del CPE (${cpeIssuanceDate.format('MM/YYYY')}) debe ser igual al período actual (${cpeAccountingPeriod.format('MM/YYYY')})`
    )
  }
}

/**
 * Función para obtener el monto de la base imponible del IGV
 * Aplica para NC del periodo actual relacionada a CPE de un periodo anterior
 * @access private
 * @return {String} Base imponible del IGV
 */
function _getTaxableAmountDiscount() {
  const taxableOperationWithDiscount = (
    _taxableOperationWithDiscount.bind(this)() === true
  )

  if (taxableOperationWithDiscount) {
    return Math.abs(this.igv.taxableAmount) * -1
  } else {
    return ''
  }
}

/**
 * Función para obtener el importe del IGV, denominado como descuento
 * Aplica para NC del periodo actual relacionada a CPE de un periodo anterior
 * @access private
 * @return {String} Importe del IGV
 */
function _getTaxAmountDiscount() {
  const taxableOperationWithDiscount = (
    _taxableOperationWithDiscount.bind(this)() === true
  )

  if (taxableOperationWithDiscount) {
    return Math.abs(this.igv.taxAmount) * -1
  } else {
    return ''
  }
}

/**
 * Función para obtener el monto de la base imponible del IGV, denominado como descuento
 * @access private
 * @return {String} Base imponible del IGV
 */
function _getTaxableAmount() {
  const taxableOperationWithoutDiscount = (
    _taxableOperationWithDiscount.bind(this)() === false
  )

  if (taxableOperationWithoutDiscount) {
    return Math.abs(this.igv.taxableAmount)
  } else {
    return ''
  }
}

/**
 * Función para obtener el importe del IGV
 * @access private
 * @return {String} Importe del IGV
 */
function _getTaxAmount() {
  const taxableOperationWithoutDiscount = (
    _taxableOperationWithDiscount.bind(this)() === false
  )

  if (taxableOperationWithoutDiscount) {
    return Math.abs(this.igv.taxAmount)
  } else {
    return ''
  }
}

/**
 * Función para obtener el indicar de descuento
 * @access private
 * @return {Boolean} Indicador de descuento (NC emitida en el periodo anterior)
 */
function _taxableOperationWithDiscount() {
  const cpeIssuanceDate = moment(this.cpe.issuanceDate, 'DD/MM/YYYY')

  const itTaxableOperation = (
    this.taxableAmount != null && this.taxableAmount > 0
  )

  if (itTaxableOperation === true) {
    if (this.cpe.type === ELECTRONIC_DOCUMENT_CODES.creditNote) {
      const refIssuanceDate = moment(this.ref.issuanceDate, 'DD/MM/YYYY')

      const previousPeriod = (
        refIssuanceDate.isBefore(cpeIssuanceDate, 'month')
      )

      if (previousPeriod) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  } else {
    return null
  }
}

module.exports = Sale
