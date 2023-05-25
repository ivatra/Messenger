const contactsQueries = require('../../database/postqre/queries/contactsQueries');
const userQueries = require('../../database/postqre/queries/userQueries');
const ApiError = require('../../error/ApiError');

class contactsService {
  async getContacts(userId, status, offset, limit) {
    status = status === 'all' ? undefined : status

    const { contacts, count } = await contactsQueries.receiveContactsAndCountByUser(userId, status, limit, offset)

    const contactsInfo = await this.fetchContactsInfo(contacts, userId)


    const newContacts = []
    contactsInfo.forEach((contact, index) => {
      const status = contacts[index].dataValues.status
      const recipient = contacts[index].dataValues.recipientId
      const sender = contacts[index].dataValues.senderId
      const contactId = contact.dataValues.id

      if (contactId === sender || contactId === recipient) {
        if (sender === userId && status === 'pending') {
          var merged = { ...contact.dataValues, status: 'outgoing' }
        } else {
          var merged = { ...contact.dataValues, status: status }
        }
        newContacts.push(merged)
      }


    })

    return { data: newContacts, count }
  }

  async getContact(userId, contactId) {
    const userInfo = await userQueries.receiveUserById(contactId)
    const contactInfo = await contactsQueries.receiveContact(userId, contactId)

    var merged
    if (contactInfo) {
      const status = contactInfo.dataValues.status
      const sender = contactInfo.dataValues.senderId

      if (sender === userId && status === 'pending') {
        merged = { ...userInfo.dataValues, status: 'outgoing' }
      }
      else {
        merged = { ...userInfo.dataValues, status: status }
      }

    } else {
      merged = { ...userInfo.dataValues, status: null }
    }
    return merged || userInfo.dataValues
  }

  async sendContactRequest(userId, contactId) {
    await this.checkForContact(userId, contactId, false)
    const contact = await contactsQueries.createContact(userId, contactId)
    return contact
  }

  async changeContactStatus(userId, contactId, status) {
    await this.checkForContact(userId, contactId, true)

    if (status !== "accepted" && status !== "declined") {
      throw ApiError.badRequest("Incorrect status ")
    }

    const isPending = await this.checkRewievedContactStatus(userId, contactId)

    if (!isPending)
      throw ApiError.badRequest(`Contact ${userId} and ${contactId} has reviewed status`)

    const contact = await contactsQueries.updateContactStatus(userId, contactId, status)

    return contact
  }

  async removeContact(senderId, recipientId) {
    await this.checkForContact(senderId, recipientId, true)

    const contact = await contactsQueries.destroyContact(senderId, recipientId)

    return contact

  }

  async fetchContactsInfo(contacts, userId) {
    return await Promise.all(contacts.map(async (contact) => {
      return contact.senderId !== userId
        ? await userQueries.receiveUserById(contact.senderId)
        : await userQueries.receiveUserById(contact.recipientId)
    }));
  }

  async checkForContact(userId, contactId, contactNeeded) {
    const contactExists = await this.isContactExists(userId, contactId)
    if (!contactExists && contactNeeded)
      throw ApiError.badRequest(`Contact ${contactId} doesn't exist`)

    else if (contactExists && !contactNeeded)
      throw ApiError.badRequest("Contact arleady exists")
  }

  async isContactExists(senderId, recipientId) {
    return await contactsQueries.receiveContact(senderId, recipientId)
  }

  async checkRewievedContactStatus(userId, contactId) {
    const contact = await contactsQueries.receiveContact(userId, contactId)
    return contact.status === "pending";
  }

}
module.exports = new contactsService()