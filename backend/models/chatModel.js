const { Sequelize, DataTypes } = require('sequelize')

const sequelize = require('../db')
const {User} = require('./userModel')


const Chat = sequelize.define('chat', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: Sequelize.ENUM('individual', 'group'),
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

const ChatParticipant = sequelize.define('chatParticipiants', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
})




Chat.hasMany(ChatParticipant,{as: 'participants'})
ChatParticipant.belongsTo(User)
ChatParticipant.belongsTo(Chat)

GroupChat.hasOne(Chat)
Chat.belongsTo(GroupChat, {foreignKey: { allowNull: true}})

IndividualChat.hasOne(Chat)
Chat.belongsTo(IndividualChat, {foreignKey: { allowNull: true}})

module.exports = {
    Chat,
    ChatParticipant,
    GroupChat,
    IndividualChat
}
