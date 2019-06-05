'use strict'

const S = require('fluent-schema')
const fastify = require('fastify')

function build (opts) {
  const app = fastify(opts)

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

  return app
}

module.exports = build

if (require.main === module) {
  // Run the server!
  build({ logger: true }).listen(3000).catch(console.error)
}
