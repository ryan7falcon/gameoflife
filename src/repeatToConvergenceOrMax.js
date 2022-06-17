const repeatToConvergenceOrMax = (n) => (f) => (x) => {
  for (let m = 0; m < n; m += 1) {
    const newX = f(m)(x)
    if (JSON.stringify(newX) === JSON.stringify(x)) { break }
    x = newX
  }
  return x
}

export default repeatToConvergenceOrMax
