import { describe, it, expect } from 'vitest'
import { shuffleArray, decodeHTMLEntities, getTodayKey, getPercentage } from '../utils/utils'

describe('shuffleArray', () => {
  it('returns array of same length', () => {
    const arr = [1, 2, 3, 4, 5]
    const result = shuffleArray([...arr])
    expect(result).toHaveLength(arr.length)
  })

  it('contains all original elements', () => {
    const arr = [1, 2, 3, 4, 5]
    const result = shuffleArray([...arr])
    expect(result.sort()).toEqual(arr)
  })
})

describe('decodeHTMLEntities', () => {
  it('decodes HTML entities', () => {
    expect(decodeHTMLEntities('&amp;')).toBe('&')
    expect(decodeHTMLEntities('&lt;')).toBe('<')
    expect(decodeHTMLEntities('&gt;')).toBe('>')
    expect(decodeHTMLEntities('&quot;')).toBe('"')
  })
})

describe('getTodayKey', () => {
  it('returns today date in YYYY-MM-DD format', () => {
    const today = new Date().toISOString().slice(0, 10)
    expect(getTodayKey()).toBe(today)
  })
})

describe('getPercentage', () => {
  it('returns correct percentage', () => {
    expect(getPercentage(8, 10)).toBe(80)
    expect(getPercentage(5, 20)).toBe(25)
    expect(getPercentage(0, 10)).toBe(0)
  })

  it('returns 0 for zero total', () => {
    expect(getPercentage(0, 0)).toBe(0)
  })
})
