import { compose } from './util.js'

import { getNextState } from './getNextState.js'
import displayBoard from './displayBoard.js'

const step = (i) => compose(
  getNextState,
  displayBoard(i),
)

export default step
