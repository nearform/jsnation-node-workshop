'use strict'
const fs = require('fs')
const { createServer } = require('http')

const server = createServer(
  (req, res) => {
    res.end(fs.readFileSync(__filename))
  }
)

server.listen(3000)