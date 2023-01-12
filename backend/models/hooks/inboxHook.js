const { InBox } = require('../../models/inBoxModel')
const { MessageRead } = require('../../models/messageModel')

const mongoClient = require('../../mongo')
const events = mongoClient.db('Messenger').collection('events')


async function getCountOfUnreadMsgs(inbox) {
  const countUnreadMsgs = events.find({
    type: "message",
    userId: inbox.userId,
    content: {
      read: false
    }
  })

  return len(countUnreadMsgs)
}
async function changeCountOfUnreadMsgs() {
  InBox.addHook('afterUpdate', async (inbox) => {
    const countUnreadMsgs = getCountOfUnreadMsgs(inbox)
    inbox.countUnreadMsgs = countUnreadMsgs
    inbox.save()
  })
}

module.exports = changeCountOfUnreadMsgs()