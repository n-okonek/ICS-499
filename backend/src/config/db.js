import { Sequelize } from 'sequelize';

if (!process.env.DB_CONNECTION) {
    console.error('Invalid mysql connection string. Exiting');
    throw new Error('Invalid mysql connection string.');
}

// If testing, init a in-memory database
const inMemoryOptions = {
    dialect: 'sqlite',
    storage: ':memory:'
}
const isTest = process.env.NODE_ENV === 'test';
const db = isTest ? new Sequelize(inMemoryOptions) : new Sequelize(process.env.DB_CONNECTION);

export default db;