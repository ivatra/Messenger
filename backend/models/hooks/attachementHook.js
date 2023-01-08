const { Attachement } = require('../../models/attachementModel')
const fileHandler = require('../../service/fileHandler')


async function deleteFileHook() {
    Attachement.addHook('afterBulkDestroy', async (attachement) => {
        console.log('deleted ', attachement.url)
        await fileHandler.deleteFile(attachement.url)
    })
}

module.exports = deleteFileHook()

// await Message.destroy({
//     cascade: true,
//     restartIdentity: true,
//     individualHooks: true
// })
// return res.json('ok')