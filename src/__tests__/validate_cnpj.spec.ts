import { validateCnpj } from '../index'

describe('Validate CNPJ', () => {
  it('Valid CNPJ', () => {
    const validCnpj = '14572457000185'
    const isValidCNPJ = validateCnpj(validCnpj)

    expect(isValidCNPJ).toBeTruthy()
  })

  it('Invalid CNPJ', () => {
    const invalidCnpj = '14572457000184'
    const isValidCNPJ = validateCnpj(invalidCnpj)

    expect(isValidCNPJ).not.toBeTruthy()
  })
})
