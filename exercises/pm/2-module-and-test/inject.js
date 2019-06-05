'use strict'

require('make-promises-safe')
const build = require('./server')

async function run () {
  const app = build()

  const res = await app.inject({
    url: '/'
  })

  console.log(JSON.parse(res.body))
}

run()
