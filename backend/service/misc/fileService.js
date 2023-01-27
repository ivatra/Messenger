const mime = require('mime-types')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs');
const ApiError = require('../../error/ApiError');

class fileService {
    async saveFile(file, fileName, dir) {
        const fileExtension = path.extname(fileName);
        const generatedFileName = uuid.v4() + fileExtension
        file.mv(path.resolve(__dirname, '..', 'static/' + dir, generatedFileName))
        return generatedFileName
    }

    async getFileType(fileName) {
        return mime.lookup(fileName).startsWith('image/') ? "image" : "file";
    }

    async checkForImage(fileName) {
        const fileType = await this.getFileType(fileName)
        if (fileType !== "image")
            throw ApiError.badRequest('File have to be image.')
    }

    async deleteFile(fileName) {
        fs.unlink(path.resolve(__dirname, '..', 'static', fileName))
    }

}

module.exports = new fileService()