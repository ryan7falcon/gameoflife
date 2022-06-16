/*
A “live” cell (value 1) remains alive only if this sum equals 2 or 3.

If the sum is greater than 3, the cell will “die” (become 0) at the next iteration due to overcrowding.

If the sum is less than 2, the cell will die due to isolation.

A dead cell will come to life only if the sum equals 3.

*/
const countAliveNeighbours = (board, row, column) => {
  let count = 0
  const minI = row === 0 ? 0 : -1
  const maxI = row === board.length - 1 ? 0 : 1
  const minJ = column === 0 ? 0 : -1
  const maxJ = column === board[0].length - 1 ? 0 : 1

  for (let i = minI; i <= maxI; i += 1) {
    for (let j = minJ; j <= maxJ; j += 1) {
      if ((i !== 0 || j !== 0) && board[row + i][column + j]) {
        count += 1
      }
    }
  }

  return count
}

function getNextValue(board) {
  const nextBoard = JSON.parse(JSON.stringify(board))
  board.forEach((rowVal, rowIndex) => {
    rowVal.forEach((isAlive, columnIndex) => {
      const count = countAliveNeighbours(board, rowIndex, columnIndex)

      if (isAlive) {
        if (count > 3 || count < 2) {
          nextBoard[rowIndex][columnIndex] = false
        }
      } else if (count === 3) {
        nextBoard[rowIndex][columnIndex] = true
      }
    })
  })
  return nextBoard
}

export { getNextValue }
