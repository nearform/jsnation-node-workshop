'use strict'
// Require the framework and instantiate it
const app = require('fastify')({
  logger: true
})

app.get('/', {
  schema: {
    querystring: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          default: 'world'
        }
      },
      required: ['name']
    }
  }
}, async (request, reply) => {
  return { hello: request.query.name }
})

// Run the server!
app.listen(3000).catch(console.error)
