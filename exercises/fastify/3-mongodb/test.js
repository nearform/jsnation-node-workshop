'use strict'

const { beforeEach, afterEach, test } = require('tap')
const clean = require('mongo-clean')
const build = require('./server')

let server

beforeEach(async function () {
  server = build()
  await server.ready()
  await clean(server.mongo.db)
})

afterEach(async function () {
  await server.close()
})

test('hello world', async function (t) {
  const res = await server.inject({
    url: '/'
  })
  t.strictDeepEqual(JSON.parse(res.body), {
    hello: 'world'
  })
})

test('hello querystring', async function (t) {
  const res = await server.inject({
    url: '/?name=Matteo'
  })
  t.strictDeepEqual(JSON.parse(res.body), {
    hello: 'Matteo'
  })
})

test('empty todos', async function (t) {
  const res = await server.inject({
    url: '/todo'
  })
  t.strictDeepEqual(JSON.parse(res.body), {
    items: []
  })
})

test('add a todo, list todos', async function (t) {
  const add = await server.inject({
    url: '/todo',
    method: 'POST',
    body: {
      name: 'something'
    }
  })
  const { _id } = JSON.parse(add.body)
  t.strictEqual(add.statusCode, 201)
  t.strictEqual(add.headers.location, `/todo/${_id}`)

  const res = await server.inject({
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
  const add = await server.inject({
    url: '/todo',
    method: 'POST',
    body: {
      name: 'something'
    }
  })
  const { _id } = JSON.parse(add.body)
  t.strictEqual(add.statusCode, 201)
  t.strictEqual(add.headers.location, `/todo/${_id}`)

  const res = await server.inject({
    url: `/todo/${_id}`
  })
  t.strictDeepEqual(JSON.parse(res.body), {
    name: 'something',
    _id
  })
})

test('404 todo', async function (t) {
  const res = await server.inject({
    url: `/todo/foobarfoobar`
  })
  t.strictEqual(res.statusCode, 404)
})
