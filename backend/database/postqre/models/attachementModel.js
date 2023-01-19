const { DataTypes, Sequelize } = require('sequelize')
const sequelize = require('../postgre')

const Attachement = sequelize.define('attachement', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: Sequelize.ENUM('image', 'file'),
    url: { type: DataTypes.STRING, allowNull: false }
})

module.exports = { Attachement }