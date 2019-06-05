'use strict'

const S = require('fluent-schema')

module.exports = async function (app) {
  app.get('/', {
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

  app.post('/', {
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
      .header('location', `${app.prefix}/${_id}`)

    return Object.assign({
      _id
    }, request.body)
  })

  app.get('/:id', {
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
}

module.exports.autoPrefix = '/todo'
