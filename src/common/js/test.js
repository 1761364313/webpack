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

<<<<<<< HEAD
console.log('hello word')

console.log(121212)
=======
console.log('hello words sdasda ')
>>>>>>> c2cb64a84e557333a8102114ee45a673f699cf45
