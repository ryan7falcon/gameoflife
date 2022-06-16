/*
A “live” cell (value 1) remains alive only if this sum equals 2 or 3.

If the sum is greater than 3, the cell will “die” (become 0) at the next iteration due to overcrowding.

If the sum is less than 2, the cell will die due to isolation.

A dead cell will come to life only if the sum equals 3.

*/

const getNeighbourIndexIterator = (index, len) => (
  [index - 1, index, index + 1].filter((v) => (v >= 0 && v < len))
)

const sum = (acc, cur) => (acc + cur)

const isAliveNeighbour = (board, row, column, i, j) => ((i !== row || j !== column) && board[i][j])

const countAliveNeighbours = (board, row, column) => {
  const rows = getNeighbourIndexIterator(row, board.length)
  const columns = getNeighbourIndexIterator(column, board[0].length)

  return rows.map((i) => columns.map(
    (j) => isAliveNeighbour(board, row, column, i, j),
  ).reduce(sum)).reduce(sum)
}

function getNextValue(board) {
  return board.map((row, rowIndex) => (
    row.map((isAlive, columnIndex) => {
      const count = countAliveNeighbours(board, rowIndex, columnIndex)

      if (count > 3 || count < 2) {
        return false
      }
      if (count === 3) {
        return true
      }
      return isAlive
    })
  ))
}

export { getNextValue }
