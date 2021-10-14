import Sequelize from 'sequelize';
import db from '../config/db.js';

const { DataTypes } = Sequelize;

const rom = db.define('rom', {
    romid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    romdata: {
        type: DataTypes.BLOB,
        allowNull: false
    },
    romhash: {
        type: DataTypes.STRING,
    }
}, {
    tableName: 'rom'
});

export default rom;