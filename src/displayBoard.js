import { print } from './util.js'

const displayBoard = (i) => (board) => {
  print(`======${i}======`)
  board.forEach((r) => {
    print(r.map((c) => (c ? 'X' : 'O')).join(' '))
  })
  return board
}

export default displayBoard
