const repeatToConvergenceOrMax = (n) => (f) => (x) => {
  let m = 0
  while (true) {
    if (m === n) { return x }
    m += 1
    const newX = f(m)(x)
    if (JSON.stringify(newX) === JSON.stringify(x)) { return x }
    x = newX
  }
}

export default repeatToConvergenceOrMax
