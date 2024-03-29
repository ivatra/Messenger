const { Attachement } = require('../models/attachementModel')
const fileService = require('../../../service/misc/fileService')


async function deleteFileHook() {
    Attachement.addHook('afterDestroy', async (attachement) => {
        await fileService.deleteFile(attachement.url)
    })
}

module.exports = deleteFileHook()