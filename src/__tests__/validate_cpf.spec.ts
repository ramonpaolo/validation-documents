import { validateCpf } from '../index'

describe('Validate CPF', () => {
    ['64882616068', '28280792015', '52568335025', '11864194073', '26058781043', '79604504045', '86692291020'].forEach((validCpf) =>
        it(`Valid CPF ${validCpf}`, () => {
            const isValidCPF = validateCpf(validCpf)

            expect(isValidCPF).toBeTruthy()
        }))

    it('Invalid CPF', () => {
        const invalidCpf = '36761664002'
        const isValidCPF = validateCpf(invalidCpf)

        expect(isValidCPF).not.toBeTruthy()
    })
})