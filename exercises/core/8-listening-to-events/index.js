'use strict'
const { EventEmitter } = require('events')
const someEmitter = new EventEmitter()

someEmitter.on('data', (data) => {
  console.log(data)
})

someEmitter.on(
  'any-event-you-like',
  (any, args, you, like) => {
    console.log('weird flex.')
  }
)
