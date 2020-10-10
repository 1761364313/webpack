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

console.log(1212221)

console.log(1221122)

console.log(222)