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

<<<<<<< HEAD
let a = 5555
=======
let a = 1212
>>>>>>> 8fa1739f9b658c97183e12529e0540bc64a798a2
