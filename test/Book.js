'use strict'

const { assert } = require('chai')

const Book = require('../lib/Book')

describe('Prototype Book.js', function() {
  it('Book.prototype should be an object', function() {
    assert.isObject(Book.prototype, 'Book.prototype is not an object')
  })

  it('Should have a getName() method', function() {
    assert.property(Book.prototype, 'getName', 'Book.prototype.getName does not exist')

    assert.isFunction(Book.prototype.getName, 'Book.prototype.getName is not a function')
  })

  it('Should have a getContent() method', function() {
    assert.property(Book.prototype, 'getContent', 'Book.prototype.getContent does not exist')

    assert.isFunction(Book.prototype.getContent, 'Book.prototype.getContent is not a function')
  })

  it('Should have a create() method', function() {
    assert.property(Book.prototype, 'create', 'Book.prototype.create does not exist')

    assert.isFunction(Book.prototype.create, 'Book.prototype.create is not a function')
  })

  it('Should have a getDigit() method', function() {
    assert.property(Book.prototype, 'getDigit', 'Book.prototype.getDigit does not exist')

    assert.isFunction(Book.prototype.getDigit, 'Book.prototype.getDigit is not a function')
  })

  it('Should have a getPath() method', function() {
    assert.property(Book.prototype, 'getPath', 'Book.prototype.getPath does not exist')

    assert.isFunction(Book.prototype.getPath, 'Book.prototype.getPath is not a function')
  })
})
