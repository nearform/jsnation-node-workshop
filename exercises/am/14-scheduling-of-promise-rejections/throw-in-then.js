'use strict'
Promise.resolve().then(() => { throw Error('problems.') })
setImmediate(() => console.log('1'))
process.nextTick(() => console.log('2'))
console.log('3')