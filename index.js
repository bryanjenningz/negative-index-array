const NegativeIndexArray = (startingArray = []) => (
  new Proxy(startingArray, {
    get: (target, name) => {
      const index = parseInt(name)
      if (Number.isNaN(index)) {
        return target[name]
      } else {
        if (Math.abs(index) > target.length) {
          throw new Error(`Out of range: ${index} for array length: ${target.length}`)
        }
        if (index < 0) {
          return target[target.length + index]
        } else {
          return target[index]
        }
      }
    },
    set: (target, name, value) => {
      const index = parseInt(name)
      if (Number.isNaN(index)) {
        return target[name] = value
      } else {
        if (index < 0) {
          return target[target.length + index] = value
        } else {
          return target[index] = value
        }
      }
    }
  })
)

const xs = NegativeIndexArray([{a: 1}, {a: 2}, '23', 45])
console.assert(xs[-1] === 45, 'last value is 45')
console.assert(xs[-2] === '23', 'second last value is "23"')
console.assert(xs[0] === xs[-4], 'the fourth last value is the zero index value')
console.assert(xs[1] === xs[-3], 'the third last value is the one index value')
