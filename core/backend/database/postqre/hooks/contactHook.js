
const eventsQueries = require('../../mongo/queries/eventsQueries')


const { Contact } = require('../models/contactModel')

async function makeContactStatusChangedEvent() {
  Contact.addHook('afterCreate', async (contact) => {
    await eventsQueries.createContactEvent(contact.recipientId,contact.dataValues,contact.dataValues.status)
  })

  Contact.addHook('afterUpdate', async (contact) => {
    await eventsQueries.createContactEvent(contact.recipientId, contact.dataValues, contact.dataValues.status)
  })
}

module.exports = makeContactStatusChangedEvent()