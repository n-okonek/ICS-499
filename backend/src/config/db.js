import { Sequelize } from 'sequelize';

if (!process.env.DB_CONNECTION) {
    console.error('Invalid mysql connection string. Exiting');
    throw new Error('Invalid mysql connection string.');
}

const db = new Sequelize(process.env.DB_CONNECTION);

export default db;