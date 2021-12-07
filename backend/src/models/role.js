export default function(sequelize, DataTypes) {
    const role = sequelize.define('role', {
        role_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'role'
    });
    return role;

}