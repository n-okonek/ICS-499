import { app } from '../src/app.js';
import db from '../src/config/db.js';

console.log('BEGINNING GLOBAL TEST SETUP');

// sync database and create required triggers
db.sequelize.sync({ force: true });