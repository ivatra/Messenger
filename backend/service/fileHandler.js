const mime = require('mime-types')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')

class fileHandler {
    async saveAttachement(file, fileName) {
        const fileExtension = path.extname(fileName);
        const generatedFileName = uuid.v4() + fileExtension
        file.mv(path.resolve(__dirname, '..', 'static', generatedFileName))
        return fileName
    }

    async getFileType(fileName) {
        return mime.lookup(fileName).startsWith('image/') ? "image" : "file";
    }

    async deleteFile(fileName){
        fs.unlink(path.resolve(__dirname, '..', 'static', fileName))
    }

}

module.exports = new fileHandler()