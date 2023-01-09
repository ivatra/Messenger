const { Sequelize, DataTypes } = require('sequelize')

const sequelize = require('../db')
const { User } = require('./userModel')


const Chat = sequelize.define('chat', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: { type: DataTypes.ENUM('individual', 'group'), allowNull: false },
})

const GroupChat = sequelize.define("groupChat", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    avatar: { type: DataTypes.STRING, allowNull: true },
    name: { type: DataTypes.STRING, allowNull: true },
    participiantsCount: { type: DataTypes.STRING, allowNull: true },
})


const IndividualChat = sequelize.define("individualChat", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: false }
})

const ChatParticipant = sequelize.define('chatParticipant', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
})




Chat.hasMany(ChatParticipant, { as: 'participants' })
ChatParticipant.belongsTo(User)
ChatParticipant.belongsTo(Chat)

Chat.hasOne(GroupChat)
GroupChat.belongsTo(Chat)

Chat.hasOne(IndividualChat)
IndividualChat.belongsTo(Chat)

module.exports = {
    Chat,
    ChatParticipant,
    GroupChat,
    IndividualChat
}
