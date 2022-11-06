import { ALIVE, DEAD } from './consts'

const getIndexIterator = (len, index) => (
  [index - 1, index, index + 1].filter((v) => (v >= 0 && v < len))
)
const rowsAround = (board, cell) => getIndexIterator(board.length, cell.r)
const columnsAround = (board, cell) => getIndexIterator(board[0].length, cell.c)

const checkNotEqual = (a, b) => ((a.r !== b.r || a.c !== b.c))
const checkAlive = (board, a) => board[a.r][a.c] === ALIVE

const nextCellState = (isAlive, aliveNeighboursCount) => {
  if (aliveNeighboursCount === 2) { return isAlive }
  if (aliveNeighboursCount === 3) { return ALIVE }
  return DEAD
}

const doesNeighbourCount = (board, cellLoc, neighbourLoc) => (
  (checkNotEqual(cellLoc, neighbourLoc) && checkAlive(board, neighbourLoc)) ? 1 : 0)

const countNeighboursInRow = (board, cellLoc, rowIdx) => columnsAround(board, cellLoc)
  .reduce((liveNeighboursInRow, colIdx) => (
    liveNeighboursInRow + doesNeighbourCount(board, cellLoc, { r: rowIdx, c: colIdx })
  ), 0)

const countNeighbours = (board, cellLoc) => rowsAround(board, cellLoc)
  .reduce((totalLiveNeighbours, rowIdx) => (
    totalLiveNeighbours + countNeighboursInRow(board, cellLoc, rowIdx)
  ), 0)

const nextRowState = (board, rowIdx) => board[rowIdx]
  .map((cellState, colIdx) => (
    nextCellState(cellState, countNeighbours(board, { r: rowIdx, c: colIdx }))
  ))

const getNextState = (board) => board.map((row, rowIdx) => nextRowState(board, rowIdx))

export {
  getNextState, nextCellState, nextRowState, countNeighbours,
}
