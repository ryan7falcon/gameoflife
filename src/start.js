import { getNextValue } from './game.js'

const board = [
  [true, true, true],
  [true, false, false],
  [true, true, true]]
const nextValue = getNextValue(board)
console.log(nextValue)
