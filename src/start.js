import {
  print,
} from './util.js'
import { step, repeatToConvergenceOrMax } from './game.js'

const board = [
  [true, true, true],
  [true, true, false],
  [false, false, true],
]

print('Game of life')

repeatToConvergenceOrMax(10)(step)(board)
