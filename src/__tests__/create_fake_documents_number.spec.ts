import { createFakeCpf, createFakeCnpj, validateCnpj, validateCpf } from '../index'

describe('Create Fakes Documents', () => {
  describe('Create Fake CNPJ', () => {
    it('when create fake CNPJ document with success', () => {
      const fakeCnpj = createFakeCnpj()

      const isValidCnpj = validateCnpj(fakeCnpj)

      expect(isValidCnpj).toBeTruthy()
    })

    it('when max retry was hit', () => {
      const maxRetryToCreateCNPJ = 1

      expect(() => createFakeCnpj(maxRetryToCreateCNPJ)).toThrow(/Max retry to create fake cnpj was hit/)
    })
  })

  describe('Create Fake CPF', () => {
    it('when create fake CPF document with success', () => {
      const fakeCpf = createFakeCpf()

      const isValidCpf = validateCpf(fakeCpf)

      expect(isValidCpf).toBeTruthy()
    })

    it('when max retry was hit', () => {
      const maxRetryToCreateCPF = 1

      expect(() => createFakeCpf(maxRetryToCreateCPF)).toThrow(/Max retry to create fake cpf was hit/)
    })
  })
})
