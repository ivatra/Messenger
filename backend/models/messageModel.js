const {Sequelize,DataTypes} = require('sequelize')

const sequelize = require('../db')
const {User} = require('./userModel')
const {Chat}= require('./chatModel')
const {Attachement} = require('./attachementModel')

const Message = sequelize.define('message', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    content: { type: DataTypes.STRING, allowNull: true },
})

Chat.hasMany(Message,{as:'messages'})
Message.belongsTo(Chat,{allowNull:false})
Message.belongsTo(User,{as:'sender',allowNull:false})

Message.hasOne(Attachement,{hooks:true,allowNull:true})
Attachement.belongsTo(Message,{hooks:true})


module.exports = {
    Message,
}