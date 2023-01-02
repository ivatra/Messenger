const { User, InBox, Contact } = require('../models')
const Sequelize = require('sequelize')
const {getContactInfo,findContacts,fetchContactsInfo} = require('./contactsService')

class PagesService {
  async getInbox(userId) {
    return "13131331"
  }

  async getContacts(userId, status) {
    status = "pending"
    const contacts = await findContacts(userId, status)
    const contactsInfo = await fetchContactsInfo(contacts, userId)
    return contactsInfo
  }

  async sendContactRequest(userId, contactId) {
    const contact = await Contact.create({ senderId: userId, recipientId: contactId, status: "pending" })
    return contact
  }

  async getNotifications(userId) {

  }

}

module.exports = new PagesService()