import { describe, expect, it } from 'vitest'
import {
  DIGITS,
  LOWERCASE,
  MAX_LENGTH,
  MIN_LENGTH,
  SYMBOLS,
  UPPERCASE,
  generatePassword,
} from './password'

const containsCharacterFrom = (value: string, characters: string) =>
  [...value].some((character) => characters.includes(character))

describe('generatePassword', () => {
  it.each([MIN_LENGTH, 11, 12, 13, 14, 15, MAX_LENGTH])(
    'generates exactly %i characters',
    (length) => {
      expect(generatePassword(length, false)).toHaveLength(length)
    },
  )

  it.each([false, true])('always contains uppercase, lowercase, and digits', (includeSymbols) => {
    for (let attempt = 0; attempt < 100; attempt += 1) {
      const password = generatePassword(12, includeSymbols)
      expect(containsCharacterFrom(password, UPPERCASE)).toBe(true)
      expect(containsCharacterFrom(password, LOWERCASE)).toBe(true)
      expect(containsCharacterFrom(password, DIGITS)).toBe(true)
    }
  })

  it('contains at least one symbol when symbols are enabled', () => {
    for (let attempt = 0; attempt < 100; attempt += 1) {
      expect(containsCharacterFrom(generatePassword(12, true), SYMBOLS)).toBe(true)
    }
  })

  it('contains no symbols when symbols are disabled', () => {
    for (let attempt = 0; attempt < 100; attempt += 1) {
      expect(containsCharacterFrom(generatePassword(12, false), SYMBOLS)).toBe(false)
    }
  })

  it('rejects lengths outside the supported range', () => {
    expect(() => generatePassword(MIN_LENGTH - 1, false)).toThrow(RangeError)
    expect(() => generatePassword(MAX_LENGTH + 1, false)).toThrow(RangeError)
  })
})
