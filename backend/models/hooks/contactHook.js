const {Contact} = require('../../models/contactModel')

const events = mongo_client.db().collection('events')

export const contactChanged = async() => {Contact.addHook('afterSave', async (contact) => {
    var event = {
      recipient_id: contact.recipientId,
      type: contact.status,
      content: {
        contactId: contact.id
      },
      notify: true,
      seen: false
    }
    await events.insertOne(event)
  }
  )}