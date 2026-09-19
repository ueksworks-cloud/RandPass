export const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
export const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'
export const DIGITS = '0123456789'
export const SYMBOLS = '!@#$%^&*()-_=+'

export const MIN_LENGTH = 10
export const MAX_LENGTH = 16

const UINT32_RANGE = 0x1_0000_0000

/** Returns an unbiased cryptographically secure integer in [0, maxExclusive). */
export function secureRandomInt(maxExclusive: number): number {
  if (!Number.isSafeInteger(maxExclusive) || maxExclusive <= 0 || maxExclusive > UINT32_RANGE) {
    throw new RangeError('maxExclusive must be an integer between 1 and 2^32')
  }

  // Discard the incomplete range at the top so modulo does not introduce bias.
  const acceptanceLimit = Math.floor(UINT32_RANGE / maxExclusive) * maxExclusive
  const randomValue = new Uint32Array(1)

  do {
    crypto.getRandomValues(randomValue)
  } while (randomValue[0] >= acceptanceLimit)

  return randomValue[0] % maxExclusive
}

function pick(characterSet: string): string {
  return characterSet[secureRandomInt(characterSet.length)]
}

function secureShuffle(characters: string[]): void {
  for (let index = characters.length - 1; index > 0; index -= 1) {
    const swapIndex = secureRandomInt(index + 1)
    ;[characters[index], characters[swapIndex]] = [characters[swapIndex], characters[index]]
  }
}

export function generatePassword(length: number, includeSymbols: boolean): string {
  if (!Number.isInteger(length) || length < MIN_LENGTH || length > MAX_LENGTH) {
    throw new RangeError(`length must be an integer from ${MIN_LENGTH} to ${MAX_LENGTH}`)
  }

  const requiredSets = [UPPERCASE, LOWERCASE, DIGITS]
  if (includeSymbols) requiredSets.push(SYMBOLS)

  const allCharacters = requiredSets.join('')
  const characters = requiredSets.map(pick)

  while (characters.length < length) {
    characters.push(pick(allCharacters))
  }

  secureShuffle(characters)
  return characters.join('')
}
