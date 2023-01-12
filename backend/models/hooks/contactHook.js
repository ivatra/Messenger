const { Contact } = require('../../models/contactModel')

const mongoCl = require('../../mongo')
const events = mongoCl.db('Messenger').collection('events')

async function makeContactStatusChangedEvent() {
  Contact.addHook('afterSave', async (contact) => {
    var event = {
      recipient_id: contact.recipientId,
      type: "Contact",
      content: {
        status:contact.status,
        contactId: contact.id
      },
      notify: true,
      sent: false
    }
    await events.insertOne(event)
  })
}

module.exports = makeContactStatusChangedEvent()