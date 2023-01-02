const mongo_client = require('../../mongo')
const events = mongo_client.db().collection('events')

const {newChatParticipiant} = require('./chatParticipiantsHook')
const {messageReceived} = require('./messageHook')
const {contactChanged} = require('./contactHook')
const {inBoxUpdated} = require ('./inboxHook')

module.exports = {
  newChatParticipiant,
  messageReceived,
  contactChanged,
  inBoxUpdated
}
