'use strict'

const { beforeEach, afterEach, test } = require('tap')
const clean = require('mongo-clean')
const build = require('../server')

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
