'use strict'
const { Transform } = require('stream')

const upper = () => new Transform({
  transform: (chunk, enc, cb) => {
    cb(null, chunk.toString().toUpperCase())
  }
})

module.exports = upper // filename: upper.js
