'use strict'
const { EventEmitter } = require('events')

function createEmitter () {
  const ee = new EventEmitter()
  process.nextTick(() => {
    ee.emit('data', 'some data.')
  })
  return ee
}

const emitter = createEmitter()
emitter.on('data', console.log)