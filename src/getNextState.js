import { ALIVE, DEAD } from './consts.js'

const getIndexIterator = (len, index) => (
  [index - 1, index, index + 1].filter((v) => (v >= 0 && v < len))
)
const rowsAround = (board, cell) => getIndexIterator(board.length, cell.r)
const columnsAround = (board, cell) => getIndexIterator(board[0].length, cell.c)

const applyAndSum = (func, iter) => iter.reduce((agg, v) => agg + func(v), 0)
const checkNotEqual = (a, rowIdx, colIdx) => ((a.r !== rowIdx || a.c !== colIdx))

const nextCellState = (isAlive, aliveNeighboursCount) => {
  if (aliveNeighboursCount === 2) { return isAlive }
  if (aliveNeighboursCount === 3) { return ALIVE }
  return DEAD
}

const doesNeighbourCount = (board, cellLoc, rowIdx) => (colIdx) => (
  (checkNotEqual(cellLoc, rowIdx, colIdx) && board[rowIdx][colIdx] === ALIVE))

const countNeighboursInRow = (board, cellLoc) => (rowIdx) => (
  applyAndSum(doesNeighbourCount(board, cellLoc, rowIdx), columnsAround(board, cellLoc)))

const countNeighbours = (board, cellLoc) => (
  applyAndSum(countNeighboursInRow(board, cellLoc), rowsAround(board, cellLoc)))

const nextRowState = (board, r) => board[r]
  .map((cellState, c) => nextCellState(cellState, countNeighbours(board, { r, c })))

const getNextState = (board) => board.map((_, r) => nextRowState(board, r))

export {
  getNextState, nextCellState, nextRowState, countNeighbours,
}
