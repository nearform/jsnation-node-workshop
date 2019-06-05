'use strict'
const p = async () => 'microtask'
const run = async () => {
  console.log(await p())
}
run()
setImmediate(() => console.log('1'))
process.nextTick(() => console.log('2'))
console.log('3')
