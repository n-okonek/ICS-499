import Sequelize from 'sequelize';
import db from '../config/db.js';

const { DataTypes } = Sequelize;

const role = db.define('role', {
    role_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
    },
    created: {
        type: DataTypes.DATE,
   }
}, {
    tableName: 'role'
});

export default role;
