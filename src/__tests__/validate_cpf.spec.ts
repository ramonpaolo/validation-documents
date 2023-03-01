import { validateCpf } from '../index'

describe('Validate CPF', () => {
  const validCPFs = ['64882616068', '28280792015', '52568335025', '11864194073', '86692291020']

  it.each(validCPFs)('when CPF is valid, return true', (validCPF) => {
    const isValidCPF = validateCpf(validCPF)

    expect(isValidCPF).toBeTruthy()
  })

  const invalidCPFs = ['13686752402', '36761664002', '17849917424', '17024119747', '12665916506']

  it.each(invalidCPFs)('when CPF(%p) is invalid, return false', (invalidCPF) => {
    const isValidCPF = validateCpf(invalidCPF)

    expect(isValidCPF).toBeFalsy()
  })
})
