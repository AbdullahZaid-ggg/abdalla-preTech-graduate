import { describe, it, expect } from 'vitest'
import { getCategoryCount, getDifficultyCount, getTotalCount, loadLocalQuestions, convertToTrueFalse } from '../utils/questions'

describe('getTotalCount', () => {
  it('returns total question count', () => {
    expect(getTotalCount()).toBeGreaterThan(0)
  })
})

describe('getCategoryCount', () => {
  it('returns count for existing category', () => {
    const count = getCategoryCount('Science')
    expect(count).toBeGreaterThan(0)
  })

  it('returns 0 for non-existing category', () => {
    expect(getCategoryCount('NonExistent')).toBe(0)
  })
})

describe('getDifficultyCount', () => {
  it('returns count for category + difficulty', () => {
    const count = getDifficultyCount('Science', 'easy')
    expect(count).toBeGreaterThan(0)
  })
})

describe('loadLocalQuestions', () => {
  it('returns all questions for All category', () => {
    const { questions } = loadLocalQuestions('All', 'all')
    expect(questions).toHaveLength(getTotalCount())
  })

  it('filters by category', () => {
    const { questions } = loadLocalQuestions('Science', 'all')
    questions.forEach(q => expect(q.category).toBe('Science'))
  })

  it('filters by difficulty', () => {
    const { questions } = loadLocalQuestions('All', 'easy')
    questions.forEach(q => expect(q.difficulty).toBe('easy'))
  })
})

describe('convertToTrueFalse', () => {
  it('converts questions to true/false format', () => {
    const { questions } = loadLocalQuestions('Science', 'easy')
    const tf = convertToTrueFalse(questions)
    expect(tf).toHaveLength(questions.length)
    tf.forEach(q => {
      expect(q.options).toEqual(['True', 'False'])
      expect([0, 1]).toContain(q.correct)
      expect(q.trueFalseStatement).toBeDefined()
    })
  })
})
