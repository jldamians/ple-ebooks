'use strict'

const assert = require('assert')
const moment = require('moment')

const BookName = require('../lib/BookName')

describe('Prototype BookName.js', function() {
  it('Should have a getText method', function() {
    assert.equal(typeof BookName.prototype, 'object')
    assert.equal(BookName.prototype.hasOwnProperty('getText'), true)
    assert.equal(typeof BookName.prototype.getText, 'function')
  })

  describe('Sales Book Name', function() {
    const taxpayerIdentityNumber = '10460033280'
    const accountingPeriod = moment('201901', 'YYYYMM')
    const bookType = '140100'
    const currencyType = 'PEN'

    it('getText() should return LE1046003328020190100140100001111.txt', function() {
      const bookEmpty = true

      const newBookName = new BookName(
        taxpayerIdentityNumber,
        accountingPeriod,
        bookType,
        bookEmpty,
        currencyType
      )

      assert.equal(newBookName.getText(), 'LE1046003328020190100140100001111.txt')
    })

    it('getText() should return LE1046003328020190100140100001011.txt', function() {
      const bookEmpty = false

      const newBookName = new BookName(
        taxpayerIdentityNumber,
        accountingPeriod,
        bookType,
        bookEmpty,
        currencyType
      )

      assert.equal(newBookName.getText(), 'LE1046003328020190100140100001011.txt')
    })
  })

  describe('Purchases Book Name', function() {
    const taxpayerIdentityNumber = '10460033280'
    const accountingPeriod = moment('201901', 'YYYYMM')
    const bookType = '080100'
    const currencyType = 'PEN'

    it('getText() should return LE1046003328020190100080100001111.txt', function() {
      const bookEmpty = true

      const newBookName = new BookName(
        taxpayerIdentityNumber,
        accountingPeriod,
        bookType,
        bookEmpty,
        currencyType
      )

      assert.equal(newBookName.getText(), 'LE1046003328020190100080100001111.txt')
    })

    it('getText() should return LE1046003328020190100080100001011.txt', function() {
      const bookEmpty = false

      const newBookName = new BookName(
        taxpayerIdentityNumber,
        accountingPeriod,
        bookType,
        bookEmpty,
        currencyType
      )

      assert.equal(newBookName.getText(), 'LE1046003328020190100080100001011.txt')
    })
  })

  describe('Non Domiciled Purchases Book Name', function() {
    const taxpayerIdentityNumber = '10460033280'
    const accountingPeriod = moment('201901', 'YYYYMM')
    const bookType = '080200'
    const currencyType = 'PEN'

    it('getText() should return LE1046003328020190100080200001111.txt', function() {
      const bookEmpty = true

      const newBookName = new BookName(
        taxpayerIdentityNumber,
        accountingPeriod,
        bookType,
        bookEmpty,
        currencyType
      )

      assert.equal(newBookName.getText(), 'LE1046003328020190100080200001111.txt')
    })

    it('getText() should return LE1046003328020190100080200001011.txt', function() {
      const bookEmpty = false

      const newBookName = new BookName(
        taxpayerIdentityNumber,
        accountingPeriod,
        bookType,
        bookEmpty,
        currencyType
      )

      assert.equal(newBookName.getText(), 'LE1046003328020190100080200001011.txt')
    })
  })
})
