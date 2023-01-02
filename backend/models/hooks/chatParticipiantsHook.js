const {Chat,ChatParticipants,GroupChat} = require('../../models/chatModel')

export const newChatParticipiant = async() => {ChatParticipants.addHook('afterInsert', async (participiants) => {
    const chat = await Chat.findOne({ where: { chatId: participiants.chatId } })
    if (chat.type === "Group") {
      const countOfParticipiants = await ChatParticipants.count({ where: { id: participiants.chatId } })
      await GroupChat.update({ participiantsCount: countOfParticipiants }, {
        where: {
          id: chat.groupChatId
        }
      })
    }
  
  })}