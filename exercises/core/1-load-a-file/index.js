'use strict'
const { readFileSync } = require('fs')

console.log(
  readFileSync(__filename).toString()
)
