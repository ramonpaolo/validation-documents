import { validateCpf } from '../index'

describe('Validate CPF', () => {
  const validCPFs = ['64882616068', '28280792015', '52568335025', '11864194073', '86692291020']

  it.each(validCPFs)('when CPF is valid, return true', (validCPF) => {
    const isValidCPF = validateCpf(validCPF)

    expect(isValidCPF).toBeTruthy()
  })

  it('when CPF is invalid, return false', () => {
    const invalidCpf = '36761664002'
    const isValidCPF = validateCpf(invalidCpf)

    expect(isValidCPF).not.toBeTruthy()
  })
})
