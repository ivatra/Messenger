const {Contact} = require('../../models/contactModel')

mongoClient = require('../../mongo')
const events = mongoClient.db().collection('events')

module.exports = async() => {Contact.addHook('afterSave', async (contact) => {
    var event = {
      recipient_id: contact.recipientId,
      type: contact.status,
      content: {
        contactId: contact.id
      },
      notify: true,
      sent: false
    }
    await events.insertOne(event)
  }
  )}