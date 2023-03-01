import { validateCnpj } from '../index'

describe('Validate CNPJ', () => {
  const validCNPJs = ['14572457000185', '15969859164108', '46879260000180', '54960389000146', '61473253000177']

  it.each(validCNPJs)('when the CNPJ is valid, return true', (validCNPJ) => {
    const isValidCNPJ = validateCnpj(validCNPJ)

    expect(isValidCNPJ).toBeTruthy()
  })

  const invalidCNPJs = ['13474820706917', '14572457000184', '13571540228530', '16441427693343', '17918128586322']

  it.each(invalidCNPJs)('when the CNPJ(%p) is invalid, return false', (invalidCNPJ) => {
    const isValidCNPJ = validateCnpj(invalidCNPJ)

    expect(isValidCNPJ).toBeFalsy()
  })
})
