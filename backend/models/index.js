const {Attachement} = require('./attachementModel')
const {Chat,GroupChat,IndividualChat,ChatParticipant} = require('./chatModel')
const {Message} = require('./messageModel')
const {InBox} = require('./inBoxModel')
const {User} = require('./userModel')
const {Contact} = require('./contactModel')
const { Sequelize } = require('../db')

module.exports = {
    User,
    Chat,
    Contact,
    GroupChat,
    IndividualChat,
    Message,
    Attachement,
    ChatParticipant,
    InBox,
}
