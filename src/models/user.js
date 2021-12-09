export default function (sequelize, DataTypes) {
    const user = sequelize.define('user', {
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
            },
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
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

    return user;

}