// Load the environment variables
import dotenv from 'dotenv';

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'production';
}

let envFile = process.env.NODE_ENV === 'test' ? `.env.test` : '.env'
envFile = process.env.NODE_ENV === 'production' ? '.env.prod' : envFile;

console.debug(`Loading enviornment variables from file ${envFile}`);

dotenv.config({ path: envFile });