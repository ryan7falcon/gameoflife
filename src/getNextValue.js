import {
  compose, reduce, length, chain, map, addIndex, range, filter, and, gt, lte, equals,
  converge, identity, curry, not, append, ifElse, T, F, always, cond,
} from 'ramda'

const mapIndexed = addIndex(map);

const getIndexIterator = (len, index) => (
  filter(
    converge(and, [lte(0), gt(len)]),
    range(index - 1, index + 2),
  )
)

const rowsAround = ({ board, cell }) => getIndexIterator(length(board), cell.r)
const columnsAround = ({ board, cell }) => getIndexIterator(length(board[0]), cell.c)

const checkAlive = curry((board, a) => board[a.r][a.c])
const checkAliveNeighbour = ({ board, cell }) => converge(
  and,
  [compose(not, equals(cell)), checkAlive(board)],
)

const getAliveNeighboursRow = ({ board, cell }) => (r) => reduce(
  (acc, c) => {
    const neighbour = { r, c }
    return ifElse(
      () => checkAliveNeighbour({ board, cell })(neighbour),
      append(neighbour),
      identity,
    )(acc)
  },
  [],
  columnsAround({ board, cell }),
)

const getAliveNeighbours = converge(
  chain,
  [getAliveNeighboursRow, rowsAround],
)

const cellShouldLive = (isAlive, aliveNeighboursCount) => cond([
  [equals(2), always(isAlive)],
  [equals(3), T],
  [T, F],
])(aliveNeighboursCount)

const getNextCellValue = (board, rowIndex) => (isAlive, columnIndex) => cellShouldLive(
  isAlive,
  compose(length, getAliveNeighbours)({
    board, cell: { r: rowIndex, c: columnIndex },
  }),
)

const getNextRowValue = (board) => (row, rowIndex) => mapIndexed(
  getNextCellValue(board, rowIndex),
  row,
)

const getNextValue = converge(mapIndexed, [getNextRowValue, identity])
export default getNextValue
