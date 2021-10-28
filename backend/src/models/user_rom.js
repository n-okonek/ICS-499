export default function(sequelize, DataTypes) {
    const user_rom = sequelize.define('user_rom', {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        romid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        }

    }, {
        tableName: 'user_rom'
    });
    
    return user_rom;
}



