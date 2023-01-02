const { User, Contact } = require('../models')
const { Sequelize } = require('sequelize')

async function getContactInfo(userId) {
  return await User.findOne(
    {
      where: { id: userId },
      attributes: ['name', 'avatar', 'isActive', 'lastSeen']
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

module.exports = { getContactInfo, findContacts, fetchContactsInfo }