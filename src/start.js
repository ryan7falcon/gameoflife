import {
  trace,
  pipe,
  compose,
  print,
} from './util.js'
import { getNextValue } from './game.js'

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

const displayBoard = (i) => (board) => {
  print(`======${i}======`)
  board.forEach((r) => {
    print(r.map((c) => (c ? 'X' : 'O')).join(' '))
  })
  return board
}

const board = [
  [true, true, true],
  [true, true, false],
  [false, false, true],
]

print('Game of life')

repeatToConvergenceOrMax(10)((i) => compose(
  getNextValue,
  displayBoard(i),
))(board)
