import { validateCpf, validateCnpj } from './index'

/**
 * @param {number} [retry=200] retry - Param to set max retrys to create fake CPF
 * @returns {string}
 */
const createFakeCpf = (retry: number = 200): string => {
    let retryAttempt = retry

    while (true) {
        const randomNumber = Math.floor((Math.random() * 10000000000) + 10000000000).toString()

        const fakeCpf = validateCpf(randomNumber)

        if (fakeCpf) return randomNumber
        else if (retryAttempt === 0) throw Error('Max retry to create fake cpf was hit')
        retryAttempt--
    }
}

/**
 * @param {number} [retry=200] - Param to set max retrys to create fake CNPJ
 * @returns {string}
 */
const createFakeCnpj = (retry: number = 200): string => {
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