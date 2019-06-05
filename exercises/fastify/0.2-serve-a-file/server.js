'use strict'
const { join } = require('path')
// Require the framework and instantiate it
const app = require('fastify')({
  logger: true
})

app.register(require('fastify-static'), {
  root: join(__dirname, 'public')
})

// Run the server!
app.listen(3000).catch(console.error)
