import Sequelize from 'sequelize';
import db from '../config/db.js';

const { DataTypes } = Sequelize;

const user = db.define('user', {
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    role_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'role',
            key: 'role_id'
        }
    },
    username: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    registered: {
        type: DataTypes.DATE,
    },
    last_login: {
        type: DataTypes.DATE,
    },
    profile: {
        type: DataTypes.TEXT,
    }
}, {
    tableName: 'user'
});

export default user;
