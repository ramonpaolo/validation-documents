import { createFakeCpf, createFakeCnpj } from '../index'

describe('Create Fakes Documents', () => {
  describe('Create Fake CNPJ', () => {
    it('when create fake CNPJ document with success', () => {
      const fakeCnpj = createFakeCnpj()

      expect(fakeCnpj).toHaveLength(14)
    })

    it('when can\'t create fake CNPJ, return a error', () => {
      const maxRetryToCreateCNPJ = 1

      expect(() => createFakeCnpj(maxRetryToCreateCNPJ)).toThrow('Max retry to create fake cnpj was hit')
    })
  })

  describe('Create Fake CPF', () => {
    it('when create fake CPF document with success', () => {
      const fakeCpf = createFakeCpf()

      expect(fakeCpf).toHaveLength(11)
    })

    it('when can\'t create fake CPF, return a error', () => {
      const maxRetryToCreateCPF = 1

      expect(() => createFakeCpf(maxRetryToCreateCPF)).toThrow('Max retry to create fake cpf was hit')
    })
  })
})
