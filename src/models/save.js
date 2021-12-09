export default function(sequelize, DataTypes) {
    const save = sequelize.define('save', {
        saveid: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        romid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'rom',
                key: 'romid'
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'user_id'
            }
        },
        created: {
            type: DataTypes.DATE,
        }
    }, {
        tableName: 'save'
    });

    return save;

}