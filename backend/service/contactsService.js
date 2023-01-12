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
  const contact = await Contact.findOne({
    where: {
      [Sequelize.Op.or]: [
        { senderId: senderId, recipientId: recipientId },
        { recipientId: senderId, senderId: recipientId }
      ]
    }
  });
  return contact !== null;
}

async function updateContact(userId, contactId, status) {
  const contact = await Contact.update(
    { status: status },
    {
      where: {
        [Sequelize.Op.or]: [
          { recipientId: userId, senderId: contactId },
          { senderId: userId, recipientId: contactId },
        ],
        status:"pending"
      },
    }
  );
}

  async function checkContactStatus(userId, contactId) {
    const contact = await Contact.findOne(
      {
        where: {
          [Sequelize.Op.or]: [
            { recipientId: userId, senderId: contactId },
            { senderId: userId, recipientId: contactId },
          ],
          status:"pending"
        },
      }
    );
  
  return contact;
}

async function destroyContact(senderId, recipientId) {
  await Contact.destroy({ 
    where: { 
      [Sequelize.Op.or]: [
        { senderId: senderId, recipientId: recipientId },
        { recipientId: senderId, senderId: recipientId }
      ]
    }
  });
}

module.exports = { getContactInfo, findContacts, fetchContactsInfo, isContactExists, destroyContact, updateContact,checkContactStatus }