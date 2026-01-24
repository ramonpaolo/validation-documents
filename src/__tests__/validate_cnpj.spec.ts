import { validateCnpj, createFakeAlphanumericCnpj } from '../index'

describe('Validate CNPJ', () => {
  const validCNPJs = ['14572457000185', '15969859164108', '46879260000180', '54960389000146', '61473253000177', '0HLK8EPV000170', 'XPX1NDEE000101', 'NHYXX68Z000100', 'EJSZ49JD000149', '1LYDNJDS000114', '0HLK8EPV000170']

  it('should validate a generated alphanumeric CNPJ', () => {
    const alphanumericCnpj = createFakeAlphanumericCnpj()
    expect(validateCnpj(alphanumericCnpj)).toBe(true)
    expect(alphanumericCnpj).toMatch(/[A-Z]/)
  })

  it.each(validCNPJs)('when the CNPJ is valid, return true', (validCNPJ) => {
    const isValidCNPJ = validateCnpj(validCNPJ)

    expect(isValidCNPJ).toBeTruthy()
  })

  const invalidCNPJs = ['13474820706917', '14572457000184', '13571540228530', '16441427693343', '17918128586322']

  it.each(invalidCNPJs)('when the CNPJ(%p) is invalid, return false', (invalidCNPJ) => {
    const isValidCNPJ = validateCnpj(invalidCNPJ)

    expect(isValidCNPJ).toBeFalsy()
  })

  describe('Alphanumeric CNPJ (new format from July 2026)', () => {
    it('should return false for CNPJ with invalid length', () => {
      expect(validateCnpj('12345678ABCD')).toBeFalsy()
      expect(validateCnpj('123456789012345')).toBeFalsy()
      expect(validateCnpj('')).toBeFalsy()
    })

    it('should handle alphanumeric characters in the first 12 positions', () => {
      // CNPJs with alphanumeric characters (valid structure, DVs may be invalid)
      // These test that the function accepts the new format without crashing
      const alphanumericCNPJs = [
        '12AB34567/0001-88', // 14 chars (with mask, will be rejected by length check)
        '12AB34567A000188', // 14 chars alfanumeric
        'AB12345678901234', // 14 chars alfanumeric
        '0000A0000B0001CD' // 14 chars alfanumeric
      ]

      // All should not throw errors, just return true or false based on DV validation
      for (const cnpj of alphanumericCNPJs) {
        expect(() => validateCnpj(cnpj)).not.toThrow()
      }
    })
  })
})
