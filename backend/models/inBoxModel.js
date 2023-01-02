const {Sequelize,DataTypes} = require('sequelize')

const sequelize = require('../db')
const {User} = require('./userModel')
const {Message} = require('./messageModel')

const InBox = sequelize.define('inbox',{
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    countUnreadMsgs:{ type: DataTypes.INTEGER,defaultValue:0},
    isPinned: { type: DataTypes.BOOLEAN, defaultValue: false }
})

InBox.belongsTo(User)
InBox.belongsTo(Message)

module.exports = {
    InBox
}