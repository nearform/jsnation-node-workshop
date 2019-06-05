'use strict'
const http = require('http')
const { createReadStream } = require('fs')
const { pipeline } = require('stream')
const upper = require('./upper')
const rs = () => createReadStream(__filename)
const server = http.createServer((req, res) => {
  pipeline(rs(), upper(), res, (err) => {
    if (err) console.error(err)
  })
})
server.listen(3000)

// curl http://localhost:3000