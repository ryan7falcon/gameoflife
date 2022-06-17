import { compose } from './util.js'

import getNextValue from './getNextValue.js'
import displayBoard from './displayBoard.js'

const step = (i) => compose(
  getNextValue,
  displayBoard(i),
)

export default step
