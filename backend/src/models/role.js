export default function(sequelize, DataTypes) {
    const role = sequelize.define('role', {
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
    return role;

}