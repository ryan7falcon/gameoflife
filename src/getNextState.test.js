import { jest } from '@jest/globals'
import {
  getNextState, nextCellState, nextRowState, countNeighbours,
} from './getNextState.js'

import { ALIVE, DEAD } from './consts'

describe('game', () => {
  it('shoud become alive with 3 neighbours', () => {
    const board = [[ALIVE, ALIVE], [ALIVE, DEAD]]
    console.log(board)
    const nextValue = getNextState(board)
    expect(nextValue).toEqual([[ALIVE, ALIVE], [ALIVE, ALIVE]])
  })

  it('shoud die with less than 2 and more than 3 neighbours', () => {
    const board = [
      [ALIVE, ALIVE, ALIVE],
      [ALIVE, DEAD, DEAD],
      [ALIVE, ALIVE, ALIVE]]
    console.log(board)
    const nextValue = getNextState(board)
    expect(nextValue).toEqual([
      [ALIVE, ALIVE, DEAD],
      [DEAD, DEAD, DEAD],
      [ALIVE, ALIVE, DEAD]])
  })
})
describe('nextCellState', () => {
  it('should live if there are 3 neighbours', () => {
    const result = nextCellState(DEAD, 3)
    expect(result).toBe(ALIVE)
  })

  it('should live if there are 2 neighbours and was alive', () => {
    const result = nextCellState(ALIVE, 2)
    expect(result).toBe(ALIVE)
  })

  it('should be dead if there are 2 neighbours and was dead', () => {
    const result = nextCellState(DEAD, 2)
    expect(result).toBe(DEAD)
  })
  it('should be dead if there are less than 2 neighbours and was alive', () => {
    const result = nextCellState(ALIVE, 1)
    expect(result).toBe(DEAD)
  })

  it('should be dead if there are less than 2 neighbours and was dead', () => {
    const result = nextCellState(DEAD, 1)
    expect(result).toBe(DEAD)
  })

  it('should be dead if there are more than 3 neighbours and was alive', () => {
    const result = nextCellState(ALIVE, 4)
    expect(result).toBe(DEAD)
  })

  it('should be dead if there are more than 3 neighbours and was dead', () => {
    const result = nextCellState(DEAD, 4)
    expect(result).toBe(DEAD)
  })
})

describe('nextRowState', () => {
  it('should calculate the next row', () => {
    const board = [
      [ALIVE, ALIVE, ALIVE],
      [ALIVE, DEAD, DEAD],
      [ALIVE, ALIVE, ALIVE]]

    expect(nextRowState(board, 0)).toEqual([
      ALIVE, ALIVE, DEAD])
  })
})

describe('countNeighbours', () => {
  it('should count 3 neighbours', () => {
    const board = [
      [ALIVE, ALIVE, ALIVE],
      [ALIVE, DEAD, DEAD],
      [ALIVE, ALIVE, ALIVE]]
    expect(countNeighbours(board, { r: 0, c: 1 })).toEqual(3)
  })

  it('should count 2 neighbours', () => {
    const board = [
      [ALIVE, ALIVE, ALIVE],
      [ALIVE, DEAD, DEAD],
      [ALIVE, ALIVE, ALIVE]]
    expect(countNeighbours(board, { r: 0, c: 0 })).toEqual(2)
  })
})
