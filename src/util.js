const pipe = (...funcs) => (x) => funcs.reduce((y, f) => f(y), x)
const compose = (...funcs) => (x) => funcs.reduceRight((y, f) => f(y), x)

const curry = (f, arr = []) => (...args) => (
  (a) => (a.length === f.length
    ? f(...a)
    : curry(f, a))
)([...arr, ...args])

const print = (...x) => console.log(...x)
const trace = curry((label, value) => {
  print(label, value)
  return value
})

const map = curry((fn, mappable) => mappable.map(fn))
const reduce = curry((fn, init, mappable) => mappable.reduce(fn, init))
const flatMap = curry((fn, mappable) => mappable.flatMap(fn))

const flip = (fn) => (a) => (b) => fn(b)(a)

const sum = reduce((acc, cur) => (acc + cur))

const repeat = (n) => (f) => (x) => {
  let m = 0
  while (true) {
    if (m === n) { return x }
    m += 1
    x = f(m)(x)
  }
}
const count = (arr) => arr.length

const filter = curry((f, mappable) => mappable.filter(f))

const flat = (mappable) => mappable.flat()

export {
  print, pipe, trace, compose, map, flip, reduce, sum, repeat, filter, count, flat, flatMap,
}
