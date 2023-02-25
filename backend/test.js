require('dotenv').config()
const sequelize = require('./database/postqre/postgre')

const chatQueries = require('./database/postqre/queries/chatQueries');
const inboxQueries = require('./database/postqre/queries/inboxQueries');
const messageQueries = require('./database/postqre/queries/messageQueries');
const stringService = require('./service/misc/stringService');

const searchMessageByContent = async (userId, message) => {
  await sequelize.authenticate()
  await sequelize.sync()

  const likeString = stringService.convertToLikeStructure(message)

  const chatsWhereUserIn = await chatQueries.receiveChatWhereUserIn(userId)
  const chatIds = chatsWhereUserIn.map(chat => chat.id);

  const messages = await messageQueries.receiveMessageThatSatisfyMessage(chatIds, likeString, message)

  const inboxes = await inboxQueries.receiveInboxesWhichSatisfyMessage(chatIds, message, likeString)
  const inboxesId = inboxes.
    filter(inbox => inbox.user != null).
    map(inbox => inbox.id);

  const augmentedInboxes = await inboxQueries.receiveUserInboxesByInboxesList(userId,inboxesId)

  const result = [...messages, ...augmentedInboxes].map(message => ({
    ...message.toJSON(),
    type: inboxesId.includes(message.id) ? 'inbox' : 'user'
  }));

  console.log(result)
}

const messageContent = "postgre"
const userId = "00227f96-f152-450f-a57d-eabc7bc7a43a"

searchMessageByContent(userId, messageContent)