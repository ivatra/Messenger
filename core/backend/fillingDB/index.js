const fs = require('fs')
const path = require('path')

const wrapFuncIntoWorkers = require('./worker_threads')
const { Chat } = require('../database/postqre/models/chatModel')
const { User } = require('../database/postqre/models/userModel')
const messageService = require('../service/chat/messageService')
const { Sequelize } = require('../database/postqre/postgre')


async function unpackFile(fileName) {
    const file = await import("./json/" + fileName + ".json", { assert: { type: "json" } })
    return file.default[fileName]
}

function getAbsolutePath(relativePath) {
    return path.resolve(__dirname, relativePath)
}

function getRandomValueFromArr(array) {
    const randomIndex = Math.floor(Math.random() * array.length)
    return array[randomIndex]
}

function randomChatType() {
    return Math.random() <= 0.75 ? 'individual' : 'group'
}

function randomAttachement(attachement) {
    return Math.random() >= 0.6 ? attachement : null;
}

// async function getAllExistedChats() {
//     return await Chat.findAll({})
// }
async function getAllExistedChats() {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // set time to start of day
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // set time to start of next day

    const chats = await Chat.findAll({
        where: {
            createdAt: {
                [ Sequelize.Op.between]: [today, tomorrow]
            }
        }
    });

    return chats;
}
async function getUserInstanceByLogin(login) {
    return await User.findOne({ where: { login: login } })
}

async function generateUserId(names) {
    const user = getRandomValueFromArr(names)
    const userInstance = await getUserInstanceByLogin(user)
    return userInstance.id
}

async function generateChatId(chats) {
    const chat = getRandomValueFromArr(chats)
    return chat.id
}

function generateAttachement(image) {
    image.name = "plain.jpeg"
    return randomAttachement(image)

}

class fillDB {
    async fillUsers() {
        const executableFile = getAbsolutePath('./creators/users')

        const names = (await unpackFile('names')).flat(1)
        const args = names.map((name) => {
            return {
                name: name
            }
        })


        wrapFuncIntoWorkers(executableFile, args)
    }

    async fillChats() {
        const executableFile = getAbsolutePath('./creators/chats')
        const names = (await unpackFile('names')).flat(1)

        // const args = await Promise.all(
        //     names.map(async () => {
        //         return {
        //             user1: await generateUserId(names),
        //             user2: '00227f96-f152-450f-a57d-eabc7bc7a43a',
        //             chatType: randomChatType()
        //         }
        //     }))

        // wrapFuncIntoWorkers(executableFile, args)
        const MAX_ARGS = 50;

        const args = await Promise.all(
            names.slice(0, MAX_ARGS).map(async () => {
                return {
                    user1: await generateUserId(names),
                    user2: '00227f96-f152-450f-a57d-eabc7bc7a43a',
                    chatType: randomChatType()
                };
            })
        );

        wrapFuncIntoWorkers(executableFile, args);
    }

    async fillMessages() {
        const executableFile = getAbsolutePath('./creators/messages')

        const messages = await unpackFile('messages3')
        var names = (await unpackFile('names')).flat(1)
        const image = await fs.promises.readFile(__dirname + '/images/attachement.jpeg')
        const chats = await getAllExistedChats()
        
        // const args = await Promise.all(
        //     messages.map(async (message) => {
        //         return {
        //             attachement1: generateAttachement(image),
        //             content: message,
        //             senderId: await generateUserId(names),
        //             chatId: await generateChatId(chats)
        //         }
        //     }))
        const MAX_ARGS = 1000;
        names = names.slice(0, 50)
        const args = await Promise.all(
            messages.slice(0, MAX_ARGS).map(async (message) => {
                return {
                    attachement1: generateAttachement(image),
                    content: message,
                    senderId: await generateUserId(names),
                    chatId: await generateChatId(chats)
                };
            })
        );

        wrapFuncIntoWorkers(executableFile, args);
        // wrapFuncIntoWorkers(executableFile, args)
    }

    async fillContacts() {
        const executableFile = getAbsolutePath('./creators/contacts')
        const names = (await unpackFile('names')).flat(1)

        for (var i = 0; i < 12; i++) {

            const args = await Promise.all(
                names.map(async () => {
                    return {
                        user1: await generateUserId(names),
                        user2: await generateUserId(names)
                    }
                }))

            wrapFuncIntoWorkers(executableFile, args)
        }
    }
}


module.exports = new fillDB()