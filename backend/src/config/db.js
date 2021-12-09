import { Sequelize } from 'sequelize';

import models from '../models/index.js';

let db = {}

if (!process.env.DB_CONNECTION) {
    console.error('Invalid mysql connection string. Exiting');
    throw new Error('Invalid mysql connection string.');
}

/**
 * Setup sequelize instance with correct database config
 */
let sequelize = null;
// Enable or disable SQL query logging
const nodeEnv = process.env.NODE_ENV;
let logging = false;
if (process.env.ENABLE_DB_LOGGING === '1') logging = true;

if (nodeEnv === 'production') {
    sequelize = new Sequelize(process.env.DB_CONNECTION);
} else if (nodeEnv === 'development') {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: './sqlite/eaas_dev.sqlite',
        logging: logging
    });
} else if (nodeEnv === 'test') {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: './sqlite/eaas_test.sqlite',
        logging: logging
    });
} else {
    throw new Error('NODE_ENV is not a valid value and a database connection cannot be made.');
}

/**
 * Read all models from directory and import
 */

Object.keys(models).forEach(modelName => {
    const model = models[modelName](sequelize, Sequelize.DataTypes);
    db[model.name] = model;
    if (db[model.name].associate) {
        db[model.name].associate(db);
    }
})

db.sequelize = sequelize;
db.Sequelize = Sequelize;

if (nodeEnv !== 'production') {
    let force = false;
    if (process.env.FORCE_SYNC === '1') force = true;
    db.sequelize.sync({ force: force })
}

await db.role.findOrCreate({
    where: {
        role_id: 1,
        title: 'user'
    },
    default: {
        role_id: 1,
        title: 'user'
    }
});

await db.role.findOrCreate({
        where: {
            role_id: 2,
            title: 'admin'
        },
        default: {
            role_id: 2,
            title: 'admin'
        }
    });

await db.role.findOrCreate({
        where: {
            role_id: 3,
            title: 'warned'
        },
        default: {
            role_id: 3,
            title: 'warned'
        }
    });

await db.role.findOrCreate({
        where: {
            role_id: 4,
            title: 'banned'
        },
        default: {
            role_id: 4,
            title: 'banned'
        }
    });

export default db;
