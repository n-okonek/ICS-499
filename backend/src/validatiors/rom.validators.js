import { checkSchema } from 'express-validator';

const createRom = checkSchema({
    name: {
        exists: true,
        errorMessage: 'name field is required.',
        isString: true,
        errorMessage: 'name must be a string'
    },
    romdata: {
        exists: true,
        errorMessage: 'romdata field is required.',
        isString: true,
        errorMessage: 'romdata blob must be a string.'
    }
})

export default {
    createRom
}