const {Sequelize,DataTypes} = require('sequelize')

const sequelize = require('../db')
const {User} = require('./userModel')
const {Message} = require('./messageModel')
const { Chat } = require('./chatModel')

const InBox = sequelize.define('inbox',{
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    countUnreadMsgs:{ type: DataTypes.INTEGER,defaultValue:0},
    isPinned: { type: DataTypes.BOOLEAN, defaultValue: false }
})

User.hasMany(InBox)
InBox.belongsTo(Chat)
InBox.belongsTo(User)
InBox.belongsTo(Message,{allowNull:true})

module.exports = {
    InBox
}