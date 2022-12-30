const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const TYPE_LEN = 30


const User = sequelize.define('user', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4,primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    avatar: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: false },
    lastSeen: { type: DataTypes.TIME }
})

const Chat = sequelize.define('chat', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: { type: DataTypes.CHAR(TYPE_LEN), allowNull: false },
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

const Message = sequelize.define('message', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    messageContent: { type: DataTypes.STRING, allowNull: true },
})

const Attachement = sequelize.define('attachement', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: { type: DataTypes.CHAR(TYPE_LEN), allowNull: false },
    url: { type: DataTypes.STRING, allowNull: false }
})

const ChatParticipants = sequelize.define('chatParticipiants', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    role: { type: DataTypes.STRING, defaultValue:"USER" }
})

const Contact = sequelize.define('contact',{
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    status: { type: DataTypes.STRING },
})

const InBox = sequelize.define('inbox',{
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    countUnreadMsgs:{ type: DataTypes.INTEGER,defaultValue:0},
    isPinned: { type: DataTypes.BOOLEAN, defaultValue: false }
})

const MessageRead = sequelize.define('messageRead',{
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    isRead: { type: DataTypes.BOOLEAN, defaultValue: false }
    })

MessageRead.belongsTo(Message)
MessageRead.belongsTo(User)

InBox.belongsTo(User)
InBox.belongsTo(Message)


Chat.hasMany(ChatParticipants)
Chat.hasMany(Message)

Message.belongsTo(Chat,{allowNull:false})
Message.belongsTo(User,{as:'sender',allowNull:false})
Message.belongsTo(Attachement,{foreignKey: { allowNull: true}})

GroupChat.hasOne(Chat, {foreignKey: { allowNull: true}})
IndividualChat.hasOne(Chat, {foreignKey: { allowNull: true}})

ChatParticipants.belongsTo(User,{allowNull:false})
ChatParticipants.belongsTo(Chat,{allowNull:false})

Contact.belongsTo(User, { as: 'sender' });
Contact.belongsTo(User, { as: 'recipient' });

module.exports = {
    User,
    Chat,
    Contact,
    GroupChat,
    IndividualChat,
    Message,
    Attachement,
    ChatParticipants,
    InBox,
    MessageRead
}
