/**
 * Converts a character to its numeric value for CNPJ validation.
 * According to the new alphanumeric CNPJ format (from July 2026):
 * - Numbers '0'-'9' → values 0-9 (ASCII 48-57 - 48)
 * - Letters 'A'-'Z' → values 17-42 (ASCII 65-90 - 48)
 *
 * @param {string} char - A single character to convert
 * @returns {number} The numeric value of the character
 */
const charToValue = (char: string): number => {
  return char.charCodeAt(0) - 48
}

/**
 * Removes formatting characters (., /, -) from CNPJ input
 * @param {string} input - CNPJ with or without formatting
 * @returns {string} Clean CNPJ (numbers and/or letters only)
 */
const removeFormatting = (input: string): string => {
  return input.replace(/[./-]/g, '')
}

/**
 * Validates the CNPJ format (aa.aaa.aaa/aaaa-dd or aa.aaa.aaa/aaaa)
 * @param {string} cnpj - CNPJ to validate (with or without check digits)
 * @returns {boolean} True if format is valid
 */
const validateFormat = (cnpj: string): boolean => {
  const regex = /^([A-Z]|\d){2}\.([A-Z]|\d){3}\.([A-Z]|\d){3}\/([A-Z]|\d){4}(-\d{2})?$/
  return regex.test(cnpj)
}

/**
 * Calculates a single check digit for CNPJ
 * @param {string} base - Base string to calculate check digit from
 * @param {number[]} weights - Weights array for calculation
 * @returns {number} The calculated check digit
 */
const calculateCheckDigit = (base: string, weights: number[]): number => {
  let sum = 0

  for (let i = 0; i < base.length; i++) {
    sum += weights[i] * charToValue(base[i])
  }

  const rest = sum % 11
  return rest < 2 ? 0 : 11 - rest
}

/**
 * Generates the check digits (DV) for a CNPJ
 * @param {string} cnpj - CNPJ base (12 characters, without check digits)
 * @returns {string} The two check digits
 */
const generateCheckDigits = (cnpj: string): string => {
  // First check digit weights: 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2
  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  const dv1 = calculateCheckDigit(cnpj, weights1)

  // Second check digit weights: 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  const dv2 = calculateCheckDigit(cnpj + dv1, weights2)

  return `${dv1}${dv2}`
}

/**
 * Calculates the first check digit for CNPJ.
 * Weights are applied from right to left: 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2
 * @param {string} cnpj - The full CNPJ (14 characters)
 * @returns {number} The first check digit
 */
const verificationFirstDigitcnpj = (cnpj: string): number => {
  // First 12 characters (base)
  const base = cnpj.slice(0, 12)

  // Weights applied from right to left: 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2
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
 * @param {string} cnpj - The full CNPJ (14 characters)
 * @returns {number} The second check digit
 */
const verificationLastDigitcnpj = (cnpj: string): number => {
  // First 13 characters (base + first check digit)
  const baseWithFirstDV = cnpj.slice(0, 13)

  // Weights applied from right to left: 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2
  const weights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

  let sum = 0

  for (let i = 0; i < 13; i++) {
    sum += weights[i] * charToValue(baseWithFirstDV[i])
  }

  const rest = sum % 11

  return rest < 2 ? 0 : 11 - rest
}

/**
 * Validates a CNPJ (14 characters, numeric or alphanumeric)
 * @param {string} input - CNPJ to validate (with or without formatting)
 * @returns {boolean} True if CNPJ is valid
 * @example
 * const validCNPJ = validateCnpj('14.572.457/0001-85')
 * if(validCNPJ) console.log('Valid CNPJ')
 */
const validateCnpj = (input: string): boolean => {
  const cnpj = removeFormatting(input)

  if (cnpj.length !== 14) return false

  const lastDigits = cnpj.slice(cnpj.length - 2)

  const firstDigitVerification = verificationFirstDigitcnpj(cnpj)
  const lastDigitVerification = verificationLastDigitcnpj(cnpj)

  const digitsVerificator = `${firstDigitVerification}${lastDigitVerification}`

  return digitsVerificator === lastDigits
}

/**
 * Generates the check digits for a CNPJ base (12 characters)
 * @param {string} input - CNPJ base (with or without formatting)
 * @returns {string} The two check digits
 * @example
 * const dv = generateCnpjDv('145724570001')
 * console.log(dv) // '85'
 */
const generateCnpjDv = (input: string): string => {
  const cnpj = removeFormatting(input)
  return generateCheckDigits(cnpj)
}

/**
 * Class for CNPJ validation and check digit generation
 * Supports the new alphanumeric CNPJ format (from July 2026)
 */
class CNPJ {
  cnpj: string
  cnpjWithoutDv!: string

  constructor (inputCnpj: string) {
    const isValid = validateFormat(inputCnpj)
    if (!isValid) {
      throw new Error('CNPJ não está no padrão aa.aaa.aaa/aaaa-dd (Para validação) ou aa.aaa.aaa/aaaa (Para geração do DV)')
    }
    this.cnpj = removeFormatting(inputCnpj)
    this.removeCheckDigits()
  }

  private removeCheckDigits (): void {
    if (this.cnpj.length === 14) {
      this.cnpjWithoutDv = this.cnpj.slice(0, -2)
    } else if (this.cnpj.length === 12) {
      this.cnpjWithoutDv = this.cnpj
    } else {
      throw new Error('CNPJ com tamanho inválido!')
    }
  }

  /**
   * Validates the CNPJ
   * @returns {boolean} True if CNPJ is valid
   */
  valida (): boolean {
    this.removeCheckDigits()
    const dv = this.geraDv()
    return `${this.cnpjWithoutDv}${dv}` === this.cnpj
  }

  /**
   * Generates the check digits for the CNPJ
   * @returns {string} The two check digits
   */
  geraDv (): string {
    this.removeCheckDigits()
    return generateCheckDigits(this.cnpjWithoutDv)
  }
}

export { validateCnpj, generateCnpjDv, CNPJ, validateFormat, removeFormatting }
export default validateCnpj
