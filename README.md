# Validate Documents

<div align="center">

![Code Size](https://img.shields.io/github/languages/code-size/ramonpaolo/validation-documents?style=flat-square)
![Code Size](https://img.shields.io/npm/dm/validate-documents?style=flat-square)
![Code Size](https://img.shields.io/npm/l/validate-documents?style=flat-square)

</div>

---

## Indice
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

After you install the package, you can use how this:

```javascript
import { validateCpf } from 'validate-documents'

const isValidCpf = validateCpf('72994324040')

if(isValidCpf) {
    // Follow the flow with valid CPF, how create user
}else{
    // Follow the flow with invalid CPF, how return response with error and status code 400 
}
```

###### Made with Love by Ramon Paolo Maram :3