const { Chat, ChatParticipant, GroupChat } = require('../../models/chatModel')

async function updateParticipantsCount() {
  ChatParticipant.addHook('afterCreate', async (participiants) => {
    const chat = await Chat.findOne({ where: { id: participiants.chatId } })
    if (chat.type === "Group") {
      const countOfParticipiants = await ChatParticipant.count({ where: { id: participiants.chatId } })
      await GroupChat.update({ participiantsCount: countOfParticipiants }, {
        where: {
          id: chat.groupChatId
        }
      })
    }
})}

module.exports = updateParticipantsCount()