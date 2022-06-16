import {
  print,
} from './util.js'
import { step, repeatToConvergenceOrMax } from './game.js'
import { board1 } from './boards.js'

print('Game of life')

repeatToConvergenceOrMax(10)(step)(board1)
