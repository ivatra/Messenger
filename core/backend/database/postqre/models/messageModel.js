const { DataTypes} = require('sequelize')
const sequelize = require('../postgre')

const { User } = require('./userModel')
const { Chat } = require('./chatModel')
const { Attachement } = require('./attachementModel')

const Message = sequelize.define('message', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    content: { type: DataTypes.STRING, allowNull: true },
    isRead: { type: DataTypes.BOOLEAN, defaultValue: false },
    index: { type: DataTypes.INTEGER }
});

const MessageVector = sequelize.define('messages_vector', {
    contentCopy: { type: DataTypes.STRING }
}, {
    timestamps: false
})

const MessageMeta = sequelize.define('messages_meta', {
    userId: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: 'id'
        }
    },
    messageId: {
        type: DataTypes.INTEGER,
        references: {
            model: Message,
            key: 'id'
        }
    },
    isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isMentioned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: false,
    tableName: 'messages_meta'
});



Chat.hasMany(Message, { as: 'messages' })

Message.belongsTo(Chat, { allowNull: false })
Message.belongsTo(User, { as: 'sender', allowNull: false })

MessageMeta.belongsTo(User, { foreignKey: 'userId' });
MessageMeta.belongsTo(Message, { foreignKey: 'messageId' });
User.hasMany(MessageMeta, { foreignKey: 'userId' });
Message.hasMany(MessageMeta, { foreignKey: 'messageId' });

Message.hasOne(MessageVector, { foreignKey: 'messageId' });

Message.hasOne(Attachement, { hooks: true, allowNull: true })
Attachement.belongsTo(Message, { hooks: true })

module.exports = {
    Message,
    MessageVector,
    MessageMeta
}