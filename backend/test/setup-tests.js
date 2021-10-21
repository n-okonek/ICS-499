import { app } from '../src/app.js';
import db from '../src/config/db.js';
import { createRomHashTrigger } from '../src/config/dbtriggers.js';

// sync database and create required triggers
db.sync({ force: true }).then(() => {
    createRomHashTrigger();
});