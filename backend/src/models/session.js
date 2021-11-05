import moment from 'moment';

export default function(sequelize, DataTypes) {
    const session = sequelize.define('session', {
        session_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        valid_until: {
            type: DataTypes.DATE,
        }
    });
    
    session.addHook('afterCreate', (new_session, options) => {
        new_session.valid_until = moment().add(1, 'days').toDate()
    })
    
    session.associate = models => {
        session.belongsTo(models.user, {
            foreignKey: 'user_id'
        });
    }

    return session;
}