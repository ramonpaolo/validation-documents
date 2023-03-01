import { createFakeCpf, createFakeCnpj } from '../index'

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
