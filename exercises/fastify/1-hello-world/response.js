'use strict'
const S = require('fluent-schema')

// Require the framework and instantiate it
const app = require('fastify')({
  logger: true
})

app.get('/', {
  schema: {
    querystring: S.object()
      .prop('name', S.string().required().default('world'))
      .valueOf(),
    response: {
      200: S.object()
        .prop('hello', S.string())
        .valueOf()
    }
  }
}, async (request, reply) => {
  return { hello: request.query.name, ignored: true }
})

// Run the server!
app.listen(3000).catch(console.error)
