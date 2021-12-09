import { checkSchema } from 'express-validator';

const signup = checkSchema({
    email: {
        exists: true,
        errorMessage: 'email field is required.',
        isString: true,
        errorMessage: 'email blob must be a string.'
    },
    password: {
        exists: true,
        errorMessage: 'password field is required.',
        isString: true,
        errorMessage: 'password must be a string'
    }
})

const login = checkSchema({
    email: {
        exists: true,
        errorMessage: 'email field is required.',
        isString: true,
        errorMessage: 'email blob must be a string.'
    },
    password: {
        exists: true,
        errorMessage: 'password field is required.',
        isString: true,
        errorMessage: 'password must be a string'
    }
})

export default {
    signup,
    login 
}