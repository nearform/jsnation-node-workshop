'use strict'

const S = require('fluent-schema')

module.exports = async function (app) {
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
}
