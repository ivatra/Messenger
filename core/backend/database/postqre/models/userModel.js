const { DataTypes, Sequelize } = require('sequelize')
const sequelize = require('../postgre')

const User = sequelize.define('user', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true,unique:true },
    login: { type: DataTypes.STRING, allowNull: false, unique: true },
    name: { type: DataTypes.STRING, allowNull: false },
    avatar: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true,allowNull:false },
    password: { type: DataTypes.STRING,allowNull:false },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: false },
    lastSeen: { type: DataTypes.DATE(6) },
    requestsCountPerMinute: { type: DataTypes.INTEGER },
    isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
})

const UserVector = sequelize.define('users_vectors', {
    loginCopy: { type: DataTypes.STRING, allowNull: false, unique: true },
    nameCopy: { type: DataTypes.STRING, allowNull: false }
},{
    timestamps: false
    })

User.hasOne(UserVector, { foreignKey: "userId" })
UserVector.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
    User,
    UserVector
}

