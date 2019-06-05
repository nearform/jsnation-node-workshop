'use strict'
const { EventEmitter } = require('events')
const someEmitter = new EventEmitter()

someEmitter.emit('data', 'some data.')

someEmitter.emit(
  'any-event-you-like', 
  'stuff', 
  'stuff', 
  'more', 
  'stuff'
)