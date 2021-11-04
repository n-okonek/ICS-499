import db from '../config/db.js';

export default function(sequelize, DataTypes) {
    const session = sequelize.define('session', {
        session_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        }
    });
    
    session.associate = models => {
        session.belongsTo(models.user, {
            foreignKey: 'user_id'
        });
    }

    return session;
}