# Validate Documents

<div align="center">

[![Run Tests](https://github.com/ramonpaolo/validation-documents/actions/workflows/ci.yml/badge.svg)](https://github.com/ramonpaolo/validation-documents/actions/workflows/ci.yml)
![Code Size](https://img.shields.io/github/languages/code-size/ramonpaolo/validation-documents?style=flat-square)
![Downloads](https://img.shields.io/npm/dm/validate-documents?style=flat-square)
![LICENSE](https://img.shields.io/npm/l/validate-documents?style=flat-square)

</div>

---

## Index
- [What is it?](#what-is-it)
- [What technologies this project use?](#what-technologies-this-project-use)
- [How install it?](#how-install-it)
- [Example of use](#example-of-use)

---

## What is it?
This project, is a lib to validate oficial documents in Brazil. This validate CPF and CNPJ.

---

## What technologies this project use?
- Node.Js
    - TypeScript
    - Jest

---

## How install it?
It's simple, just run the command in the terminal, example:
```bash
# Installing package

# Yarn
$ yarn add validate-documents

# npm
$ npm install validate-documents
```

---

## Exemple of use:

### Validate Documents

```javascript
import { validateCpf } from 'validate-documents'

const isValidCpf = validateCpf('72994324040')

if(isValidCpf) {
    // Follow the flow with valid CPF, how create user
}else{
    // Follow the flow with invalid CPF, how return response with error and status code 400 
}
```

### Create Fake Document Number

```javascript
import { createFakeCpf } from 'validate-documents'

try {
    const cpfCreated = createFakeCpf()
    console.log('created CPF:', cpfCreated)
} catch (error) {
    console.error({
        error_name: error.name, // Error
        error_message: error.message, // Max retry to create fake cpf was hit
    })
}
```

###### Made with Love by Ramon Paolo Maram :3