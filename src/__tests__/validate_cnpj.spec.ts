import { validateCnpj } from '../index'

describe('Validate CNPJ', () => {
  const validCNPJs = ['14572457000185', '15969859164108', '46879260000180', '54960389000146', '61473253000177']

  it.each(validCNPJs)('when the CNPJ is valid, return true', (validCNPJ) => {
    const isValidCNPJ = validateCnpj(validCNPJ)

    expect(isValidCNPJ).toBeTruthy()
  })

  it('when the CNPJ is invalid, return false', () => {
    const invalidCnpj = '14572457000184'
    const isValidCNPJ = validateCnpj(invalidCnpj)

    expect(isValidCNPJ).not.toBeTruthy()
  })
})
