const contactsQueries = require('../database/postqre/queries/contactsQueries');
const userQueries = require('../database/postqre/queries/userQueries');
const ApiError = require('../error/ApiError');


async function getContactInfo(userId) {
  return await userQueries.receiveUserById(userId)
}

async function findContacts(userId, status) {
  return await contactsQueries.receiveContactsByUser(userId, status)
}

async function fetchContactsInfo(contacts, userId) {
  return await Promise.all(contacts.map(async (contact) => {
    return contact.senderId !== userId
      ? await getContactInfo(contact.dataValues.senderId)
      : await getContactInfo(contact.dataValues.recipientId);
  }));
}

async function isContactExists(senderId, recipientId) {
  const contact = await contactsQueries.receiveContact(senderId, recipientId)
  return contact !== null;
}

async function updateContact(userId, contactId, status) {
  return await contactsQueries.updateContactStatus(userId, contactId, status)
}

async function checkContactStatus(userId, contactId) {
  const contact = await contactsQueries.receiveContact(userId,contactId)

  return contact.status === "pending";
}

async function destroyContact(senderId, recipientId) {
  return await contactsQueries.destroyContact(senderId,recipientId)
}

module.exports = { getContactInfo, findContacts, fetchContactsInfo, isContactExists, destroyContact, updateContact, checkContactStatus }