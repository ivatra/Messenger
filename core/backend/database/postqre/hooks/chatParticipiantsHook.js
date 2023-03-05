const { Chat, ChatParticipant, GroupChat } = require('../models/chatModel')



async function updateGroupChat(chatId,value) {
  const chat = await Chat.findOne({ where: { id: chatId },include:[{model:GroupChat}]})
    if (chat.type === "group") {
      await GroupChat.increment('participiantsCount', { by: value, where: { chatId: chatId } });
    }
}


async function updateParticipantsCount() {
  ChatParticipant.addHook('afterCreate', async (participants) => {
    await updateGroupChat(participants.chatId,1)
  })

  ChatParticipant.addHook('afterDestroy', async (participants) => {
    await updateGroupChat(participants.chatId,-1)
  })
}

module.exports = updateParticipantsCount()