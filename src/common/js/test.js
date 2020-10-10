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

console.log(12121)
console.log('wellcome to beijing ss test')

let a = 5555
let d = 1212

let c = 'hello word !'

let e = 'wellcome to beijing'