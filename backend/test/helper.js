import db from '../src/config/db.js';
import { createRomHashTrigger } from '../src/config/dbtriggers.js'

export const refreshDB = async() => {
    await db.sync({ force: true });
    await createRomHashTrigger();
}