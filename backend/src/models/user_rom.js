export default function(sequelize, DataTypes) {
    const user_rom = sequelize.define('user_rom', {
    }, {
        tableName: 'user_rom'
    });
    
    user_rom.associate = models => {
        user_rom.belongsTo(models.user, {
            foreignKey: "userid"
        });

        user_rom.belongsTo(models.rom, {
            foreignKey: "romid"
        });
    }
    
    user_rom.removeAttribute('id');
    
    return user_rom;
}



