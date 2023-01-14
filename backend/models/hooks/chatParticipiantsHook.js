const { Chat, ChatParticipant, GroupChat } = require('../../models/chatModel')



async function updateGroupChat(chatId) {
  await GroupChat.updateOne({ chatId: chatId }, { $inc: { participiantsCount: 1 } });
}

async function updateParticipantsCount() {
  ChatParticipant.addHook('afterCreate', async (participiants) => {
    const chat = await Chat.findOne({ where: { id: participiants.chatId } })
    if (chat.type === "Group") {
      await updateGroupChat(participiants.chatId)
    }
  })
}

module.exports = updateParticipantsCount()