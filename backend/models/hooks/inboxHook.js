const { InBox } = require('../../models/inBoxModel')

const mongoClient = require('../../mongo')
const events = mongoClient.db('Messenger').collection('events')


async function getCountOfUnreadMsgs(userId) {
  const countUnreadMsgs = events.find({
    type: "Message",
    recipientId: userId,
    "content.isRead": false
  }).toArray()

  return (await countUnreadMsgs).length
}
async function changeCountOfUnreadMsgs() {
  InBox.addHook('afterUpdate', async (inbox) => {
    const countUnreadMsgs = await getCountOfUnreadMsgs(inbox.userId)
    inbox.countUnreadMsgs = countUnreadMsgs
    inbox.save()
  })
}

module.exports = changeCountOfUnreadMsgs()