/**
 * 
 * @param {string} cpf 11 characters
 *  
 * @returns {boolean} that represent if CPF is valid or not
 * @example 
 * const validCPF = validateCpf('36761664004')
 * 
 * if(validCPF) console.log('Valid CPF')
 * else console.error('Invalid CPF')
*/
const validateCpf = (cpf: string) => {
    const lastDigits = cpf.slice(cpf.length-2)

    const firstDigitVerification = verificationFirstDigitCpf(cpf)
    const lastDigitVerification = verificationLastDigitCpf(cpf)

    const digitsVerificator = `${firstDigitVerification}${lastDigitVerification}`

    return digitsVerificator === lastDigits
}

const verificationFirstDigitCpf = (cpf: string) => {
    const firstDigits = cpf.slice(0, cpf.length-2)
    
    let multiplication = 10
    let sum = 0

    for(const digit of firstDigits){
        sum += multiplication * Number(digit)
        multiplication--
    }

    const penultimDigit = (sum * 10) % 11

    return penultimDigit
}

const verificationLastDigitCpf = (cpf: string) => {
    const firstDigits = cpf.slice(0, cpf.length-1)

    let multiplication = 11
    let sum = 0

    for(const digit of firstDigits){
        sum += multiplication * Number(digit)
        multiplication--
    }

    const lastDigit = (sum * 10) % 11

    return lastDigit
}

export default validateCpf