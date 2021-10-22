import db from '../src/config/db.js';

export const refreshDB = async() => {
    await db.sequelize.sync({ force: true });
}