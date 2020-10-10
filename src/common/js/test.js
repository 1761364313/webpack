const a = {}
Object.defineProperties(a, {
  name: {
    value: 'test',
    configurable: true,
    writable: true,
    enumerable: true
  },
  age: {
    value: '255',
    configurable: false,
    writable: false,
    enumerable: true
  }
})

a.name = 'change'
a.age = 3333

console.log('a', a)

console.log('a', a)

console.log('hello words')
console.log('wellcome to beijing ss ')

console.log(12121)