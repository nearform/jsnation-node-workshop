'use strict'
const { createReadStream } = require('fs')
// Require the framework and instantiate it
const app = require('fastify')({
  logger: true
})

app.get('/', async (request, reply) => {
  reply.type('text/javascript')
  return createReadStream(__filename)
})

// Run the server!
app.listen(3000).catch(console.error)
