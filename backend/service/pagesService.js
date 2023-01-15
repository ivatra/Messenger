const { User, InBox, Contact, Message, GroupChat, Chat, IndividualChat, ChatParticipant } = require('../models')
const { getContactInfo, findContacts, fetchContactsInfo, isContactExists, destroyContact, updateContact, checkContactStatus } = require('./contactsService')
const ApiError = require('../error/ApiError')
const { Sequelize } = require('../db')
const chatService = require('./chatService')


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

    // if(checkContactStatus(userId,contactId))
    //   throw ApiError.badRequest(`Contact ${userId} and ${contactId} has reviewed status`)

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
    return await InBox.findAll({
      where: { userId: userId },
      include: [
        { model: Message, attributes: ['content', 'senderId'] },
        {
          model: Chat,
          attributes: ['type'],
          include: [
            {
              model: GroupChat,
              attributes: ['name', 'avatar'],
              required: false
            },
            {
              model: IndividualChat,
              attributes: ['isActive'],
              required: false,
            },
            {
              model: ChatParticipant,
              attributes: ['userId'],
              as: 'participants',
              where: {
                userId: { [Sequelize.Op.ne]: userId },
              },
              include: [
                {
                  model: User,
                  attributes: ['avatar', 'name', 'lastSeen'],
                }
              ]
            }]
        }]
    });
  }

  async getNotifications(userId) {

  }

}

module.exports = new PagesService()