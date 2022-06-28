import {
  map, compose, sum, trace, filter, count, flat, flatMap, reduce,
} from './util.js'

const getIndexIterator = (len, index) => (
  [index - 1, index, index + 1].filter((v) => (v >= 0 && v < len))
)
const rowsAround = (board, cell) => getIndexIterator(board.length, cell.r)
const columnsAround = (board, cell) => getIndexIterator(board[0].length, cell.c)

const checkNotEqual = (a, b) => ((a.r !== b.r || a.c !== b.c))
const checkAlive = (board, a) => board[a.r][a.c]

const getAliveNeighboursRow = (board, cell) => (r) => reduce(
  (acc, c) => {
    const neighbour = { r, c }
    return checkNotEqual(cell, neighbour) && checkAlive(board, neighbour)
      ? [...acc, neighbour]
      : acc
  },
  [],
  columnsAround(board, cell),
)

const getAliveNeighbours = ({ board, cell }) => flatMap(
  getAliveNeighboursRow(board, cell),
  rowsAround(board, cell),
)

const cellShouldLive = (isAlive, aliveNeighboursCount) => {
  if (aliveNeighboursCount === 2) { return isAlive }
  if (aliveNeighboursCount === 3) { return true }
  return false
}

const getNextCellValue = (board, rowIndex) => (isAlive, columnIndex) => cellShouldLive(
  isAlive,
  compose(count, getAliveNeighbours)({
    board, cell: { r: rowIndex, c: columnIndex },
  }),
)

const getNextRowValue = (board) => (row, rowIndex) => map(
  getNextCellValue(board, rowIndex),
  row,
)

const getNextValue = (board) => map(getNextRowValue(board), board)
export default getNextValue
