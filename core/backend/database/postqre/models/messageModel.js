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

Chat.hasMany(Message, { as: 'messages' })
Message.belongsTo(Chat, { allowNull: false })
Message.belongsTo(User, { as: 'sender', allowNull: false })


Message.hasOne(MessageVector, { foreignKey: 'messageId' });

Message.hasOne(Attachement, { hooks: true, allowNull: true })
Attachement.belongsTo(Message, { hooks: true })

module.exports = {
    Message,
    MessageVector
}