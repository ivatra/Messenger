const contactsQueries = require('../../database/postqre/queries/contactsQueries');
const userQueries = require('../../database/postqre/queries/userQueries');
const ApiError = require('../../error/ApiError');

class contactsService {
  async getContacts(userId, status) {
    const contacts = await contactsQueries.receiveContactsByUser(userId, status)
    const contactsInfo = await this.fetchContactsInfo(contacts, userId)

    const contactsInfoWithStatus = contactsInfo.map(contact => {
      const contactWithStatus = { ...contact.dataValues };
      const matchingContact = contacts.find(c => c.dataValues.recipientId === contactWithStatus.id ||
        c.dataValues.senderId === contactWithStatus.id);
      if (matchingContact) {
        contactWithStatus.status = matchingContact.dataValues.status;
      }
      return contactWithStatus;
    });

    return contactsInfoWithStatus
  }

  async getContact(userId) {
    const contactInfo = await userQueries.receiveUserById(userId)
    return contactInfo
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

    const isUpdated = await contactsQueries.updateContactStatus(userId, contactId, status) !== [0]

    return isUpdated ?
      `Contact ${contactId} ${status}` :
      `Something went wrong with changing ${contactId} status`
  }

  async removeContact(senderId, recipientId) {
    await this.checkForContact(senderId, recipientId, true)

    const isDestroyed = await contactsQueries.destroyContact(senderId, recipientId) !== [0]

    return isDestroyed ?
      `contact ${recipientId} removed` :
      `Something went wrong with removing ${recipientId}`

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
    const contact = await contactsQueries.receiveContact(senderId, recipientId)
    return contact !== null;
  }

  async checkRewievedContactStatus(userId, contactId) {
    const contact = await contactsQueries.receiveContact(userId, contactId)
    return contact.status === "pending";
  }

}
module.exports = new contactsService()