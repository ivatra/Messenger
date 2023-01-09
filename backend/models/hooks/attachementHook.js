const { Attachement } = require('../../models/attachementModel')
const fileHandler = require('../../service/fileHandler')


async function deleteFileHook() {
    Attachement.addHook('afterDestroy', async (attachement) => {
        console.log('deleted ', attachement.url)
        await fileHandler.deleteFile(attachement.url)
    })
}

module.exports = deleteFileHook()