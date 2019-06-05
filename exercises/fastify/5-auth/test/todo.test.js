'use strict'

const { beforeEach, afterEach, test } = require('tap')
const clean = require('mongo-clean')
const build = require('../server')
const { createUser } = require('@matteo.collina/fastify-auth-mongo-jwt')

let server
let inject

beforeEach(async function () {
  server = build()
  await server.ready()
  await clean(server.mongo.db)
  inject = (await createUser(server)).inject
})

afterEach(async function () {
  await server.close()
})

test('empty todos', async function (t) {
  const res = await inject({
    url: '/todo'
  })
  t.strictDeepEqual(JSON.parse(res.body), {
    items: []
  })
})

test('add a todo, list todos', async function (t) {
  const add = await inject({
    url: '/todo',
    method: 'POST',
    body: {
      name: 'something'
    }
  })
  const { _id } = JSON.parse(add.body)
  t.strictEqual(add.statusCode, 201)
  t.strictEqual(add.headers.location, `/todo/${_id}`)

  const res = await inject({
    url: '/todo'
  })
  t.strictDeepEqual(JSON.parse(res.body), {
    items: [{
      name: 'something',
      _id
    }]
  })
})

test('add a todo, get a todo', async function (t) {
  const add = await inject({
    url: '/todo',
    method: 'POST',
    body: {
      name: 'something'
    }
  })
  const { _id } = JSON.parse(add.body)
  t.strictEqual(add.statusCode, 201)
  t.strictEqual(add.headers.location, `/todo/${_id}`)

  const res = await inject({
    url: `/todo/${_id}`
  })
  t.strictDeepEqual(JSON.parse(res.body), {
    name: 'something',
    _id
  })
})

test('404 todo', async function (t) {
  const res = await inject({
    url: `/todo/foobarfoobar`
  })
  t.strictEqual(res.statusCode, 404)
})

