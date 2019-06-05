'use strict'
const { createReadStream } = require('fs')
const http = require('http')
const server = http.createServer(
  (req, res) => {
    createReadStream(__filename).pipe(res)
  }
)
server.listen(3000)
