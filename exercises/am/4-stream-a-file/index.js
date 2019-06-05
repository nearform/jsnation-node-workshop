'use strict'
const { createReadStream } = require('fs')

createReadStream(__filename)
  .pipe(process.stdout)
