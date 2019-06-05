'use strict'
// Require the framework and instantiate it
const app = require('fastify')({
  logger: true
})

app.get('/', async (request, reply) => {
  return 'hello jsnation'
})

// Run the server!
app.listen(3000).catch(console.error)
