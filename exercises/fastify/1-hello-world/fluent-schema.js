
const S = require('fluent-schema')

// Require the framework and instantiate it
const app = require('fastify')({
  logger: true
})

app.get('/', {
  schema: {
    querystring: S.object()
      .prop('name', S.string().required().default('world'))
      .valueOf()
  }
}, async (request, reply) => {
  return { hello: request.query.name }
})

// Run the server!
app.listen(3000).catch(console.error)
