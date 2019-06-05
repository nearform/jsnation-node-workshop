'use strict'

const S = require('fluent-schema')
const fastify = require('fastify')

function build (opts) {
  const app = fastify(opts)

  app.register(require('fastify-mongodb'), {
    url: 'mongodb://localhost/workshop'
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

  app.get('/todo', {
    schema: {
      response: {
        200: S.object()
          .prop('items', S.array()
            .items(S.object()
              .prop('name', S.string())
              .prop('_id', S.string())
            ))
          .valueOf()
      }
    }
  }, async (request, reply) => {
    const todos = app.mongo.db.collection('todos')
    const items = await todos.find().toArray()
    return { items }
  })

  app.post('/todo', {
    schema: {
      body: S.object().prop('name', S.string()).valueOf(),
      response: {
        200: S.object()
          .prop('items', S.array()
            .items(S.object()
              .prop('name', S.string())
              .prop('id', S.string())
            ))
          .valueOf()
      }
    }
  }, async (request, reply) => {
    const todos = app.mongo.db.collection('todos')

    const data = await todos.insertOne(request.body)
    const _id = data.insertedId

    reply
      .code(201)
      .header('location', `/todo/${_id}`)

    return Object.assign({
      _id
    }, request.body)
  })

  app.get('/todo/:id', {
    schema: {
      params: S.object()
        .prop('id', S.string())
        .valueOf(),
      response: {
        200: S.object()
          .prop('name', S.string())
          .prop('_id', S.string())
          .valueOf()
      }
    }
  }, async (request, reply) => {
    const { ObjectId } = app.mongo
    const todos = app.mongo.db.collection('todos')
    const item = await todos.findOne({ _id: new ObjectId(request.params.id) })
    if (item === null) {
      reply.code(404).send()
      return
    }
    return item
  })

  return app
}

module.exports = build

if (require.main === module) {
  // Run the server!
  build({ logger: true }).listen(3000).catch(console.error)
}
