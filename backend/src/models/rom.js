import crypto from 'crypto';

export default function(sequelize, DataTypes) {
    const rom = sequelize.define('rom', {
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
        tableName: 'rom',
    });

    rom.addHook('beforeValidate', (rom, options) => {
        const sha = crypto.createHash('sha1');
        sha.update(rom.romdata);
        rom.romhash = sha.digest('hex');
    })

    return rom;
}