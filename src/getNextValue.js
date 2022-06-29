import {
  compose, reduce, length, chain, map, addIndex, range, filter, and, gt, lte, equals,
  converge, identity, curry, not, append, ifElse, T, F, always, cond, add, useWith, flip,
} from 'ramda'

const mapIndexed = addIndex(map);

const getIndexIterator = (len, index) => filter(
  converge(and, [lte(0), gt(len)]),
  map(add(index), range(-1, 2)),
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

const getAliveNeighbours = converge(chain, [getAliveNeighboursRow, rowsAround])

const cellShouldLive = (isAlive) => cond([
  [equals(2), always(isAlive)],
  [equals(3), T],
  [T, F],
])

const getNextCellValue = (board) => (r) => (isAlive, c) => cellShouldLive(isAlive)(
  compose(length, getAliveNeighbours)({ board, cell: { r, c } }),
)

const getNextRowValue = (board) => useWith(
  flip(mapIndexed),
  [identity, getNextCellValue(board)],
)

const getNextValue = converge(mapIndexed, [getNextRowValue, identity])
export default getNextValue
