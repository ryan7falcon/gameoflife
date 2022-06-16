const print = (...x) => console.log(...x)
const pipe = (...funcs) => (x) => funcs.reduce((y, f) => f(y), x)
const compose = (...funcs) => (x) => funcs.reduceRight((y, f) => f(y), x)
const trace = (label) => (value) => {
  print(label, value)
  return value
}
const map = (fn) => (mappable) => mappable.map(fn)
const reduce = (fn) => (mappable) => mappable.reduce(fn)
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

export {
  print, pipe, trace, compose, map, flip, reduce, sum, repeat,
}
