'use strict'
const { EventEmitter } = require('events')

function createEmitter () {
  const ee = new EventEmitter()
  ee.emit('data', 'some data.')
  return ee
}

const emitter = createEmitter()