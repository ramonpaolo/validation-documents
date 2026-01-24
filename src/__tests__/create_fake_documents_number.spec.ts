import { createFakeCpf, createFakeCnpj, createFakeAlphanumericCnpj, validateCnpj } from '../index'

describe('Create Fakes Documents', () => {
  const maxRetryToCreateFakeDocumentWithSuccess = 500
  const maxRetryToGetErrorWhenTryCreateFakeDocument = 1

  describe('Create Fake CNPJ', () => {
    it('when create fake CNPJ document with success', () => {
      const fakeCnpj = createFakeCnpj(maxRetryToCreateFakeDocumentWithSuccess)

      expect(fakeCnpj).toHaveLength(14)
    })

    it('when can\'t create fake CNPJ, return a error', () => {
      expect(() => createFakeCnpj(maxRetryToGetErrorWhenTryCreateFakeDocument)).toThrow('Max retry to create fake cnpj was hit')
    })
  })

  describe('Create Fake Alphanumeric CNPJ (new format from July 2026)', () => {
    it('when create fake alphanumeric CNPJ document with success', () => {
      const fakeAlphanumericCnpj = createFakeAlphanumericCnpj(maxRetryToCreateFakeDocumentWithSuccess)

      expect(fakeAlphanumericCnpj).toHaveLength(14)
      expect(validateCnpj(fakeAlphanumericCnpj)).toBe(true)
    })

    it('when generated CNPJ contains alphanumeric characters in first 12 positions', () => {
      const fakeAlphanumericCnpj = createFakeAlphanumericCnpj(maxRetryToCreateFakeDocumentWithSuccess)

      const base = fakeAlphanumericCnpj.slice(0, 12)
      const checkDigits = fakeAlphanumericCnpj.slice(12)

      // Check digits should be numeric
      expect(checkDigits).toMatch(/^[0-9]{2}$/)

      // Base should contain at least one letter (not just numbers)
      expect(base).toMatch(/[A-Z]/)
    })

    it('should generate different CNPJs on each call', () => {
      const cnpj1 = createFakeAlphanumericCnpj()
      const cnpj2 = createFakeAlphanumericCnpj()

      // Very unlikely to generate the same CNPJ twice
      expect(cnpj1).not.toBe(cnpj2)
    })
  })

  describe('Create Fake CPF', () => {
    it('when create fake CPF document with success', () => {
      const fakeCpf = createFakeCpf(maxRetryToCreateFakeDocumentWithSuccess)

      expect(fakeCpf).toHaveLength(11)
    })

    it('when can\'t create fake CPF, return a error', () => {
      expect(() => createFakeCpf(maxRetryToGetErrorWhenTryCreateFakeDocument)).toThrow('Max retry to create fake cpf was hit')
    })
  })
})
