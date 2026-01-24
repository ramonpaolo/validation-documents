import { validateCpf, validateCnpj } from './index'

/**
 * @param {number} [retry=200] retry - Param to set max retrys to create fake CPF
 * @returns {string}
 */
const createFakeCpf = (retry: number = 200): string => {
  let retryAttempt = retry

  while (true) {
    const randomNumber = Math.floor((Math.random() * 10000000000) + 10000000000).toString()

    const fakeCpf = validateCpf(randomNumber)

    if (fakeCpf) return randomNumber
    else if (retryAttempt === 0) throw Error('Max retry to create fake cpf was hit')
    retryAttempt--
  }
}

/**
 * Generates a random alphanumeric character (A-Z, 0-9)
 * @returns {string} A random character
 */
const getRandomAlphanumericChar = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  return chars.charAt(Math.floor(Math.random() * chars.length))
}

/**
 * Converts a character to its numeric value for CNPJ validation
 * According to the new alphanumeric CNPJ format: value = ASCII(char) - 48
 * @param {string} char - A single character
 * @returns {number} The numeric value
 */
const charToValue = (char: string): number => {
  return char.charCodeAt(0) - 48
}

/**
 * Calculates the first check digit for CNPJ.
 * Weights are applied from right to left: 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2
 * @param {string} base - The CNPJ base (12 characters)
 * @returns {number} The first check digit
 */
const calculateFirstCheckDigit = (base: string): number => {
  const weights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  let sum = 0

  for (let i = 0; i < 12; i++) {
    sum += weights[i] * charToValue(base[i])
  }

  const rest = sum % 11
  return rest < 2 ? 0 : 11 - rest
}

/**
 * Calculates the second check digit for CNPJ.
 * Weights are applied from right to left: 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2
 * @param {string} baseWithFirstDV - The CNPJ base with first check digit (13 characters)
 * @returns {number} The second check digit
 */
const calculateSecondCheckDigit = (baseWithFirstDV: string): number => {
  const weights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  let sum = 0

  for (let i = 0; i < 13; i++) {
    sum += weights[i] * charToValue(baseWithFirstDV[i])
  }

  const rest = sum % 11
  return rest < 2 ? 0 : 11 - rest
}

/**
 * @param {number} [retry=200] - Param to set max retrys to create fake CNPJ
 * @returns {string}
 */
const createFakeCnpj = (retry: number = 200): string => {
  let retryAttempt = retry

  while (true) {
    const randomNumber = Math.floor((Math.random() * 10000000000000) + 10000000000000).toString()

    const fakeCnpj = validateCnpj(randomNumber)

    if (fakeCnpj) return randomNumber
    else if (retryAttempt === 0) throw Error('Max retry to create fake cnpj was hit')
    retryAttempt--
  }
}

/**
 * Creates a fake alphanumeric CNPJ (new format from July 2026)
 * Format: 12 alphanumeric characters (root + branch) + 2 numeric check digits
 * @param {number} [retry=200] - Param to set max retries to create fake alphanumeric CNPJ
 * @returns {string} A valid alphanumeric CNPJ
 */
const createFakeAlphanumericCnpj = (retry: number = 200): string => {
  let retryAttempt = retry

  while (true) {
    // Generate 12 random alphanumeric characters for the base
    let base = ''
    for (let i = 0; i < 12; i++) {
      base += getRandomAlphanumericChar()
    }

    // Calculate check digits
    const firstDV = calculateFirstCheckDigit(base)
    const secondDV = calculateSecondCheckDigit(base + String(firstDV))

    const alphanumericCnpj = base + String(firstDV) + String(secondDV)

    // Verify the generated CNPJ is valid
    if (validateCnpj(alphanumericCnpj)) {
      return alphanumericCnpj
    } else if (retryAttempt === 0) {
      throw Error('Max retry to create fake alphanumeric cnpj was hit')
    }
    retryAttempt--
  }
}

export {
  createFakeCpf,
  createFakeCnpj,
  createFakeAlphanumericCnpj
}
