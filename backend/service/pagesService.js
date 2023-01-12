const { User, InBox, Contact } = require('../models')
const { getContactInfo, findContacts, fetchContactsInfo, isContactExists, destroyContact, updateContact, checkContactStatus } = require('./contactsService')
const ApiError = require('../error/ApiError')


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
    const contact = await Contact.create({ senderId: userId, recipientId: contactId, status: "pending" })
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

    if(checkContactStatus(userId,contactId))
      throw ApiError.badRequest(`Contact ${userId} and ${contactId} has reviewed status`)
      
    await updateContact(userId, contactId, status)
    return `contact ${contactId} ${status}`
  }

  async removeContact(userId, contactId) {
    const contactExists = await isContactExists(userId, contactId)
    if (!contactExists)
      throw ApiError.badRequest(`Contact ${contactId} doesn't exist`)

    await destroyContact(userId, contactId)
    return `contact ${contactId} removed`
  }

  async getInbox(userId) {
    return "13131331"
  }

  async getNotifications(userId) {

  }

}

module.exports = new PagesService()