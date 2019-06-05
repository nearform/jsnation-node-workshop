'use strict'

const fastify = require('fastify')
const path = require('path')

function build (opts) {
  const app = fastify(opts)

  app.register(require('fastify-mongodb'), {
    url: 'mongodb://localhost/workshop'
  })

  app.register(require('fastify-autoload'), {
    dir: path.join(__dirname, 'routes')
  })

  return app
}

module.exports = build

if (require.main === module) {
  // Run the server!
  build({ logger: true }).listen(3000).catch(console.error)
}
