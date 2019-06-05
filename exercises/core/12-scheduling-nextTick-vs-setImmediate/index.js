'use strict'
setImmediate(() => console.log('1'))
process.nextTick(() => console.log('2'))
console.log('3')