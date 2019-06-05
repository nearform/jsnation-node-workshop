'use strict'
require('make-promises-safe')
setImmediate(() => console.log('1'))
process.nextTick(() => console.log('2'))
console.log('3')
