const {Sequelize,DataTypes} = require('sequelize')

const sequelize = require('../db')
const {User} = require('./userModel')
const {Chat}= require('./chatModel')
const {Attachement} = require('./attachementModel')

const Message = sequelize.define('message', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    messageContent: { type: DataTypes.STRING, allowNull: true },
})


const MessageRead = sequelize.define('messageRead',{
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    isRead: { type: DataTypes.BOOLEAN, defaultValue: false }
    })

MessageRead.belongsTo(Message)
MessageRead.belongsTo(User)

Message.belongsTo(Chat,{allowNull:false})
Message.belongsTo(User,{as:'sender',allowNull:false})
Message.belongsTo(Attachement,{foreignKey: { allowNull: true}})


module.exports = {
    Message,
    MessageRead
}