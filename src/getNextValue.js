import {
  compose, reduce, length, chain, map, addIndex, range, filter, and, gt, lte, equals,
  converge, identity, curry, not, append, ifElse, T, F, always, cond, add, useWith, flip, prop, head, path,
} from 'ramda'

const mapIndexed = addIndex(map);

const getIndexIterator = (len, index) => filter(
  converge(and, [lte(0), gt(len)]),
  map(add(index), range(-1, 2)),
)
const rowsAround = converge(
  getIndexIterator,
  [compose(length, prop('board')), path(['cell', 'r'])],
)
const columnsAround = converge(
  getIndexIterator,
  [compose(length, head, prop('board')), path(['cell', 'c'])],
)

const checkAlive = curry((board, a) => board[a.r][a.c])
const checkAliveNeighbour = ({ board, cell }) => converge(
  and,
  [compose(not, equals(cell)), checkAlive(board)],
)

const getAliveNeighboursRow = (bc) => (r) => reduce(
  (acc, c) => {
    const neighbour = { r, c }
    return ifElse(
      () => checkAliveNeighbour(bc)(neighbour),
      append(neighbour),
      identity,
    )(acc)
  },
  [],
  columnsAround(bc),
)

const getAliveNeighbours = converge(chain, [getAliveNeighboursRow, rowsAround])

const cellShouldLive = (isAlive, count) => cond([
  [equals(2), always(isAlive)],
  [equals(3), T],
  [T, F],
])(count)

const makeBC = curry((board, r, c) => ({ board, cell: { r, c } }))
const getNextCellValue = (board) => (r) => useWith(
  cellShouldLive,
  [identity, compose(length, getAliveNeighbours, makeBC(board, r))],
)

const getNextRowValue = (board) => useWith(
  flip(mapIndexed),
  [identity, getNextCellValue(board)],
)

const getNextValue = converge(mapIndexed, [getNextRowValue, identity])
export default getNextValue
