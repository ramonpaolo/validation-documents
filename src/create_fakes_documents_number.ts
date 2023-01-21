import { validateCpf, validateCnpj } from './index'

const createFakeCpf = (retry: number = 200) => {
    let retryAttempt = retry

    while (true) {
        const randomNumber = Math.floor((Math.random() * 10000000000) + 10000000000).toString()

        const fakeCpf = validateCpf(randomNumber)

        if (fakeCpf) return randomNumber
        else if (retryAttempt === 0) throw Error('Max retry to create fake cpf was hit')
        retryAttempt--
    }
}

const createFakeCnpj = (retry: number = 200) => {
    let retryAttempt = retry

    while (true) {
        const randomNumber = Math.floor((Math.random() * 10000000000000) + 10000000000000).toString()

        const fakeCnpj = validateCnpj(randomNumber)

        if (fakeCnpj) return randomNumber
        else if (retryAttempt === 0) throw Error('Max retry to create fake cnpj was hit')
        retryAttempt--
    }
}

export {
    createFakeCpf,
    createFakeCnpj,
}