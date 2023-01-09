const { Attachement } = require('../../models/attachementModel')
const fileService = require('../../service/fileService')


async function deleteFileHook() {
    Attachement.addHook('afterDestroy', async (attachement) => {
        console.log('deleted ', attachement.url)
        await fileService.deleteFile(attachement.url)
    })
}

module.exports = deleteFileHook()