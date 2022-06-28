import { jest } from '@jest/globals'
import getNextValue from './getNextValue.js'

describe('game', () => {
  it('shoud become alive with 3 neighbours', () => {
    const board = [[true, true], [true, false]]
    console.log(board)
    const nextValue = getNextValue(board)
    expect(nextValue).toEqual([[true, true], [true, true]])
  })

  it('shoud die with less than 2 and more than 3 neighbours', () => {
    const board = [
      [true, true, true],
      [true, false, false],
      [true, true, true]]
    console.log(board)
    const nextValue = getNextValue(board)
    expect(nextValue).toEqual([
      [true, true, false],
      [false, false, false],
      [true, true, false]])
  })
})
