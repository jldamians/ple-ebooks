'use strict'

const ELECTRONIC_DOCUMENT_TYPES = require('./constants/ElectronicDocumentTypes')

function Sale() {
  let _args = {}

  // Periodo contable (AAAAMM00)
  Object.defineProperty(this, 'accountingPeriod', {
    get: () => { return _args.accountingPeriod },
    set: (value) => { _args.accountingPeriod = value }
  })

  // Número correlativo del mes o código único de la operación
  Object.defineProperty(this, 'cuo', {
    get: () => { return _args.cuo },
    set: (value) => { _args.cuo = value }
  })

  // Número correlativo del asiento contable
  Object.defineProperty(this, 'accountingEntryNumber', {
    get: () => { return _args.sequential },
    set: (value) => { _args.sequential = value }
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
    /**
     * @param {CPE} value comprobante
     */
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
    /**
     * @param {Currency} value moneda
     */
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
    /**
     * @param {CPE} value referencia
     */
    set: (value) => { _args.ref = value }
  })

  Object.defineProperty(this, 'finalNumber', {
    get: () => { return _args.finalNumber },
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

  // Valor facturado de la exportación
  Object.defineProperty(this, 'exportAmount', {
    get: () => { return _args.exportAmount },
    set: (value) => { _args.exportAmount = value }
  })

  // Base imponible de la operación gravada
  Object.defineProperty(this, 'taxableAmount', {
    get: () => { return _args.taxableAmount },
    set: (value) => { _args.taxableAmount = value }
  })

  // Importe total de la operación exonerada
  Object.defineProperty(this, 'exemptAmount', {
    get: () => { return _args.exemptAmount },
    set: (value) => { _args.exemptAmount = value }
  })

  // Importe total de la operación inafecta
  Object.defineProperty(this, 'nonTaxableAmount', {
    get: () => { return _args.nonTaxableAmount },
    set: (value) => { _args.nonTaxableAmount = value }
  })

  // Otros conceptos, tributos y cargos
  Object.defineProperty(this, 'otherChargesAmount', {
    get: () => { return _args.otherChargesAmount },
    set: (value) => { _args.otherChargesAmount = value }
  })

  // Importe total del comprobante de pago
  Object.defineProperty(this, 'payableAmount', {
    get: () => { return _args.payableAmount || '' },
    set: (value) => { _args.payableAmount = value }
  })

  // Identificación del contrato o del proyecto
  Object.defineProperty(this, 'contractIdentification', {
    get: () => { return _args.contractIdentification },
    set: (value) => { _args.contractIdentification = value }
  })

  // Inconsistencia en el tipo de cambio
  Object.defineProperty(this, 'exchangeRateInconsistency', {
    get: () => { return _args.exchangeRateInconsistency },
    set: (value) => { _args.exchangeRateInconsistency = value }
  })

  // Indicador de comprobantes de pagos cancelados con  los medios
  // de pago definidos en la "Tabla 1 - Tipo de Medio de Pago"
  Object.defineProperty(this, 'authorizedPaymentMethod', {
    get: () => { return _args.authorizedPaymentMethod },
    set: (value) => { _args.authorizedPaymentMethod = value }
  })

  // Estado que identifica la oportunidad de la anotación
  Object.defineProperty(this, 'annotationOpportunityStatus', {
    get: () => { return _args.annotationOpportunityStatus },
    set: (value) => { _args.annotationOpportunityStatus = value }
  })
}

module.exports = Sale
