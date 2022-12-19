import { validateCpf } from '../index'

describe('Validate CPF', () => {

    it('Valid CPF', () => {
        const validCpf = '64882616068'
        const isValidCPF = validateCpf(validCpf)

        expect(isValidCPF).toBeTruthy()
    })

    it('Invalid CPF', () => {
        const invalidCpf = '36761664002'
        const isValidCPF = validateCpf(invalidCpf)

        expect(isValidCPF).not.toBeTruthy()
    })
})