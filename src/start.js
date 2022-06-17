/*
A “live” cell (value 1) remains alive only if this sum equals 2 or 3.

If the sum is greater than 3, the cell will “die” (become 0)
at the next iteration due to overcrowding.

If the sum is less than 2, the cell will die due to isolation.

A dead cell will come to life only if the sum equals 3.

*/
import { print } from './util.js'
import repeatToConvergenceOrMax from './repeatToConvergenceOrMax.js'
import step from './step.js'
import { board1 } from './boards.js'

print('Game of life')

repeatToConvergenceOrMax(10)(step)(board1)
