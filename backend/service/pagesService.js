const { getContactInfo, findContacts, fetchContactsInfo, isContactExists, destroyContact, updateContact} = require('./contactsService')
const ApiError = require('../error/ApiError')
const inboxQueries = require('../database/postqre/queries/inboxQueries')
const contactsQueries = require('../database/postqre/queries/contactsQueries')


class PagesService {
  async getContacts(userId, status) {
    status = "pending"
    const contacts = await findContacts(userId, status)
    const contactsInfo = await fetchContactsInfo(contacts, userId)
    return contactsInfo
  }

  async getContact(userId) {
    const contactInfo = await getContactInfo(userId)
    return contactInfo
  }

  async sendContactRequest(userId, contactId) {
    const contactExists = await isContactExists(userId, contactId)
    if (contactExists) {
      throw ApiError.badRequest("Contact arleady exists")
    }
    const contact = await contactsQueries.createContact(userId,contactId)
    return contact
  }

  async changeContactStatus(userId, contactId, status) {
    const contactExists = await isContactExists(userId, contactId)
    if (!contactExists) {
      throw ApiError.badRequest("Contact doesn't exist")
    }
    if (status !== "accepted" && status !== "declined") {
      throw ApiError.badRequest("Incorrect status ")
    }

    // if(checkContactStatus(userId,contactId))
    //   throw ApiError.badRequest(`Contact ${userId} and ${contactId} has reviewed status`)

    const result = await updateContact(userId, contactId, status) === [0]
    return result ? `contact ${contactId} ${status}` : `something went wrong with changing ${contactId} status`
  }

  async removeContact(userId, contactId) {
    const contactExists = await isContactExists(userId, contactId)
    if (!contactExists)
      throw ApiError.badRequest(`Contact ${contactId} doesn't exist`)

    await destroyContact(userId, contactId)
    return `contact ${contactId} removed`
  }

  async getInbox(userId) {
    return await inboxQueries.receiveUserInboxes(userId)
  }

  async getNotifications(userId) {

  }

}

module.exports = new PagesService()