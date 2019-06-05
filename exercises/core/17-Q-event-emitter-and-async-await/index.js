'use strict'
const { EventEmitter } = require('events')

function createEmitter () {
  const ee = new EventEmitter()
  const data = async () => 'some data'
  const fetch = async () => {}
  fetch()
  return ee
}

const emitter = createEmitter()
emitter.on('data', console.log)
