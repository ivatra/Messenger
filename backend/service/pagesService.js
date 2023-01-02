const { User, InBox, Contact } = require('../models')
const Sequelize = require('sequelize')
const { getContactInfo, findContacts, fetchContactsInfo, isContactExists, destroyContact, updateContact } = require('./contactsService')
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
    const contactExists= await isContactExists(userId, contactId)
    if (contactExists) {
      throw ApiError.badRequest("Contact arleady exists")
    }
    const contact = await Contact.create({ senderId: userId, recipientId: contactId, status: "pending" })
    return contact
  }

  async changeContactStatus(userId, contactId, type) {
    const contactExists = await isContactExists(userId, contactId)
    if (!contactExists) {
      throw ApiError.badRequest("Contact doesn't exist")
    }
    const status = await updateContact(userId, contactId, type)
    return `contact ${contactId} ${status}`
  }

  async removeContact(userId, contactId) {
    const contactExists = await isContactExists(userId, contactId)
    if (contactExists) {
      await destroyContact(userId, contactId)
      return `contact ${contactId} removed`
    }
    return `contact ${contactId} doesn't exist`
  }

  async getInbox(userId) {
    return "13131331"
  }

  async getNotifications(userId) {

  }

}

module.exports = new PagesService()