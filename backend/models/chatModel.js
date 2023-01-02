const { Sequelize, DataTypes } = require('sequelize')

const sequelize = require('../db')
const {User} = require('./userModel')


const Chat = sequelize.define('chat', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: Sequelize.ENUM('individual', 'group'),
    isPinned: { type: DataTypes.BOOLEAN, defaultValue: false }
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

const ChatParticipants = sequelize.define('chatParticipiants', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    role: { type: DataTypes.STRING, defaultValue: "USER" }
})


GroupChat.hasOne(Chat, {foreignKey: { allowNull: true}})
IndividualChat.hasOne(Chat, {foreignKey: { allowNull: true}})

ChatParticipants.belongsTo(User,{allowNull:false})
ChatParticipants.belongsTo(Chat,{allowNull:false})


module.exports = {
    Chat,
    ChatParticipants,
    GroupChat,
    IndividualChat
}
