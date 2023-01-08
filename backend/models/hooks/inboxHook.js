const {InBox} = require('../../models/inBoxModel')
const {MessageRead} = require('../../models/messageModel')

module.exports = async() => {InBox.addHook('afterUpdate', async (inbox) => {
    const countUnreadMsgs = await MessageRead.count({where:{chatId:inbox.chatId,userId:inbox.userId,isRead:false}})
    inbox.countUnreadMsgs = countUnreadMsgs
    inbox.save()
  })}