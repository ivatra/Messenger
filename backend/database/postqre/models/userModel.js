const { DataTypes, Sequelize } = require('sequelize')
const sequelize = require('../postgre')

const User = sequelize.define('user', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4,primaryKey: true },
    login: { type: DataTypes.STRING, allowNull: false,unique:true },
    name: { type: DataTypes.STRING, allowNull: false },
    avatar: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: false },
    lastSeen: { type: DataTypes.TIME }
})

module.exports = {
    User
}

