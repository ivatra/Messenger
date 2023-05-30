const contactsQueries = require('../../database/postqre/queries/contactsQueries');
const userQueries = require('../../database/postqre/queries/userQueries');
const ApiError = require('../../error/ApiError');

class contactsService {
  async getContacts(userId, status, offset, limit) {
    status = status === 'all' ? undefined : status

    const { contacts, count } = await contactsQueries.receiveContactsAndCountByUser(userId, status, limit, offset)

    const newContacts = contacts.map((contact, index) => {
      const status = contacts[index].dataValues.status
      const recipient = contacts[index].dataValues.recipientId
      const sender = contacts[index].dataValues.senderId

      var merged = {}
      var userId = sender === userId ? recipient : sender
      if (sender === userId && status === 'pending') {
        merged = {id:contact.dataValues.id, status: 'outgoing', userId: userId }
      } else {
        merged = { id: contact.dataValues.id, status: status, userId: userId }
      }

      return { [contact.id]: merged }


    })

    return { data: newContacts, count }
  }

  async getContact(userId, contactId) {
    const contact = await contactsQueries.receiveContact(userId,contactId)
    var merged = {}

    if(contact){
      const status = contact.dataValues.status
      const recipient = contact.dataValues.recipientId
      const sender = contact.dataValues.senderId
      var userId = sender === userId ? recipient : sender

      if (sender === userId && status === 'pending') {
        merged = { id: contact.dataValues.id, status: 'outgoing', userId: userId }
      } else {
        merged = { id: contact.dataValues.id, status: status, userId: userId }
      }
    }

    return merged
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