const { InBox } = require("../models/inboxModel");

const eventsQueries = require('../../mongo/queries/eventsQueries')


async function getCountOfUnreadMsgs(userId) {
  const countUnreadMsgs = await eventsQueries.receiveUnreadMsgs(userId)

  return countUnreadMsgs.length
}
async function changeCountOfUnreadMsgs() {
  InBox.addHook('afterUpdate', async (inbox) => {
    const countUnreadMsgs = await getCountOfUnreadMsgs(inbox.userId)
    inbox.countUnreadMsgs = countUnreadMsgs
    inbox.save()
  })
}

module.exports = changeCountOfUnreadMsgs()