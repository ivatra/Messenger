const { DataTypes, Sequelize } = require('sequelize')
const sequelize = require('../postgre')

const {User} = require('./userModel')

const Contact = sequelize.define('contact',{
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    status: Sequelize.ENUM('pending', 'accepted', 'declined')}
)

Contact.belongsTo(User, {as:'sender'});
Contact.belongsTo(User, {as:'recipient'});

module.exports = {
    Contact
}