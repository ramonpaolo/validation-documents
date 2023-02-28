/**
 *
 * @param {string} cnpj 14 characters
 *
 * @returns {boolean} that represent if CNPJ is valid or not
 * @example
 * const validCNPJ = validateCnpj('36761664004')
 *
 * if(validCNPJ) console.log('Valid CNPJ')
 * else console.error('Invalid CNPJ')
*/
const validateCnpj = (cnpj: string): boolean => {
  const lastDigits = cnpj.slice(cnpj.length - 2)

  const firstDigitVerification = verificationFirstDigitcnpj(cnpj)
  const lastDigitVerification = verificationLastDigitcnpj(cnpj)

  const digitsVerificator = `${firstDigitVerification}${lastDigitVerification}`

  return digitsVerificator === lastDigits
}

const verificationFirstDigitcnpj = (cnpj: string): number => {
  let cnpjReverse = ''

  let i = 13

  while (cnpjReverse.length !== 14) {
    cnpjReverse = cnpjReverse.concat(cnpj[i])
    i--
  }

  const firstDigits = cnpjReverse.slice(2)

  let multiplication = 2
  let sum = 0

  for (const digit of firstDigits) {
    sum += multiplication * Number(digit)
    multiplication === 9 ? multiplication = 2 : multiplication++
  }

  const rest = (sum % 11)

  if (rest === 0 || rest === 1) return 0

  const penultimDigit = 11 - rest

  return penultimDigit
}

const verificationLastDigitcnpj = (cnpj: string): number => {
  let cnpjReverse = ''

  let i = 13

  while (cnpjReverse.length !== 14) {
    cnpjReverse = cnpjReverse.concat(cnpj[i])
    i--
  }

  const firstDigits = cnpjReverse.slice(1)

  let multiplication = 2
  let sum = 0

  for (const digit of firstDigits) {
    sum += multiplication * Number(digit)
    multiplication === 9 ? multiplication = 2 : multiplication++
  }

  const rest = (sum % 11)

  if (rest === 0 || rest === 1) return 0

  const lastDigit = 11 - rest

  return lastDigit
}

export default validateCnpj
