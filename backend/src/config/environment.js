// Load the environment variables
import dotenv from 'dotenv';

const envFile = process.env.NODE_ENV === 'test' ? `.env.test` : '.env'

console.debug(`Loading enviornment variables from file ${envFile}`);

dotenv.config({ path: envFile });