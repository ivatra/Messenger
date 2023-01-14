const { createContactEvent } = require('../../events/eventCreator')
const { Contact } = require('../../models/contactModel')

const mongoCl = require('../../mongo')
const events = mongoCl.db('Messenger').collection('events')


async function makeContactStatusChangedEvent() {
  Contact.addHook('afterCreate', async (contact) => {
    const event = createContactEvent(contact.recipiendId,contact.status,contact.id)
    await events.insertOne(event)
  })

  Contact.addHook('afterUpdate', async (contact) => {
    const event = createContactEvent(contact.recipientId,contact.status,contact.dataValues)
    await events.insertOne(event)
  })
}

module.exports = makeContactStatusChangedEvent()