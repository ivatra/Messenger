const ApiError = require('../error/ApiError');
const { User, Contact } = require('../models')
const { Sequelize } = require('sequelize')

async function getContactInfo(userId) {
  return await User.findOne(
    {
      where: { id: userId },
      attributes: ['id','name', 'avatar', 'isActive', 'lastSeen']
    })
}

async function findContacts(userId, status) {
  return await Contact.findAll({
    where: {
      [Sequelize.Op.or]: [
        { senderId: userId },
        { recipientId: userId },
      ],
      status: status,
    },
    attributes: ['senderId', 'recipientId'],
  })
}

async function fetchContactsInfo(contacts, userId) {
  return await Promise.all(contacts.map(async (contact) => {
    return contact.senderId !== userId
      ? await getContactInfo(contact.senderId)
      : await getContactInfo(contact.recipientId);
  }));
}

async function isContactExists(senderId, recipientId) {
  var contact = await Contact.findOne({ where: { senderId: senderId, recipientId: recipientId } })
  if (contact !== null) {
    return true
  }
  contact = await Contact.findOne({ where: { recipientId: senderId, senderId: recipientId } })
  if (contact !== null) {
    return true
  }
  return false
}

async function updateContact(userId, contactId, type) {
  var status
  if (type === "accept") { status = "accepted" }
  else if (type == "deny") { status = "declined" }
  else { throw ApiError.badRequest("Incorrect type") }

  await Contact.update({ status: status }, { where: { recipientId: userId, senderId: contactId } })
  await Contact.update({ status: status }, { where: { senderId: userId, recipientId: contactId } })
  return status
}
async function destroyContact(senderId, recipientId) {
  await Contact.destroy({ where: { senderId: senderId, recipientId: recipientId, status: "accepted" } })
  await Contact.destroy({ where: { recipientId: senderId, senderId: recipientId, status: "accepted" } })
}

module.exports = { getContactInfo, findContacts, fetchContactsInfo, isContactExists, destroyContact, updateContact }