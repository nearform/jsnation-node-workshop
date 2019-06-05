'use strict'
const { createServer } = require('http')

const server = createServer(
  (req, res) => {
    res.end('hello jsnation')
  }
)

server.listen(3000)

// curl http://localhost:3000
