/*
A “live” cell (value 1) remains alive only if this sum equals 2 or 3.

If the sum is greater than 3, the cell will “die” (become 0) at the next iteration due to overcrowding.

If the sum is less than 2, the cell will die due to isolation.

A dead cell will come to life only if the sum equals 3.

*/
import {
  map, compose, sum, print,
} from './util.js'

const getIndexIterator = (len) => (index) => (
  [index - 1, index, index + 1].filter((v) => (v >= 0 && v < len))
)

const getNeighbouringRowsIndexes = (board) => getIndexIterator(board.length)

const getNeighbouringColumnsIndexes = (board) => getIndexIterator(board[0].length)

const isNeighbour = (row, column, i, j) => ((i !== row || j !== column))

const isAliveNeighbour = (board, cellRowIndex, cellColumnIndex, i, j) => (
  isNeighbour(cellRowIndex, cellColumnIndex, i, j) && board[i][j]
)

const countAliveNeighboursInRow = (board, cellRowIndex, cellColumnIndex) => (i) => compose(
  sum,
  map((j) => isAliveNeighbour(board, cellRowIndex, cellColumnIndex, i, j)),
  getNeighbouringColumnsIndexes(board),
)(cellColumnIndex)

const countAliveNeighbours = (board, cellRowIndex, cellColumnIndex) => compose(
  sum,
  map(countAliveNeighboursInRow(board, cellRowIndex, cellColumnIndex)),
  getNeighbouringRowsIndexes(board),
)(cellRowIndex)

const shouldLive = (isAlive, count) => {
  if (count === 2) {
    return isAlive
  }
  if (count === 3) {
    return true
  }
  return false
}

function getNextValue(board) {
  return board.map((row, rowIndex) => (
    row.map((isAlive, columnIndex) => (
      shouldLive(isAlive, countAliveNeighbours(board, rowIndex, columnIndex))))
  ))
}

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

const step = (i) => compose(
  getNextValue,
  displayBoard(i),
)

export {
  getNextValue, step,
}
