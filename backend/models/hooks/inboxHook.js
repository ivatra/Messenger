const {InBox} = require('../../models/inBoxModel')
const {MessageRead} = require('../../models/messageModel')

async function changeCountOfUnreadMsgs(){
  InBox.addHook('afterUpdate', async (inbox) => {
    const countUnreadMsgs = await MessageRead.count({where:{chatId:inbox.chatId,userId:inbox.userId,isRead:false}})
    inbox.countUnreadMsgs = countUnreadMsgs
    inbox.save()
})}

module.exports = changeCountOfUnreadMsgs()