const {Sequelize,DataTypes} = require('sequelize')

const {User} = require('./userModel')
const sequelize = require('../db')

const Contact = sequelize.define('contact',{
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    status: Sequelize.ENUM('pending', 'accepted', 'declined'),
})

Contact.belongsTo(User, { as: 'sender' });
Contact.belongsTo(User, { as: 'recipient' });

module.exports = {
    Contact
}