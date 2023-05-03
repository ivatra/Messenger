const fs = require('fs')
const path = require('path')

const wrapFuncIntoWorkers = require('./worker_threads')
const { Chat } = require('../database/postqre/models/chatModel')
const { User } = require('../database/postqre/models/userModel')
const messageService = require('../service/chat/messageService')
const { Sequelize } = require('../database/postqre/postgre')
const contactsService = require('../service/pages/contactsService')
const chatQueries = require('../database/postqre/queries/chatQueries')


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
                [Sequelize.Op.between]: [today, tomorrow]
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

function between(min, max) {
    return Math.floor(
        Math.random() * (max - min) + min
    )
}

async function generateSenderId(chatId){
    const chat = await chatQueries.receiveChatContent(chatId)

    const randomValue = between(0, chat.dataValues.participants.length)
    return chat.dataValues.participants[randomValue].user.id

}

async function generateChat(chats){
    const chatId = await generateChatId(chats)
    const senderId = await generateSenderId(chatId)
    return {senderId:senderId,chatId:chatId}

}

const currentUserId = '4a2e36bb-91a5-4e60-ba5c-cdc85618134b'
class fillDB {
    async fillUsers() {
        const executableFile = getAbsolutePath('./creators/users')

        const names = (await unpackFile('names')).flat(1)

        const shortedNames = names.slice(0, 500)

        const args = shortedNames.map((name) => {
            return {
                name: name
            }
        })


        wrapFuncIntoWorkers(executableFile, args)
    }

    async fillChats() {
        const executableFile = getAbsolutePath('./creators/chats')
        const names = (await unpackFile('names')).flat(1)

        const shortedNames = names.slice(0, 100)

        const args = await Promise.all(
            shortedNames.map(async (name) => {
                const user2 = await getUserInstanceByLogin(name) 

                return {
                    user1: currentUserId,
                    user2: user2.dataValues.id,
                    chatType: randomChatType()
                };
            })
        );
        const newArgs = new Set(args)
        wrapFuncIntoWorkers(executableFile, Array.from(newArgs));
    }

    async fillMessages() {
        const executableFile = getAbsolutePath('./creators/messages')

        const messages = await unpackFile('messages3')
        var names = (await unpackFile('names')).flat(1)
        const shortedNames = names.slice(0, 500)

        const image = await fs.promises.readFile(__dirname + '/images/attachement.jpeg')

        const chats = await getAllExistedChats()

        const args = await Promise.all(
            messages.slice(0,1000).map(async (message) => {
                const misc = await generateChat(chats)
                return {
                    // attachement1: generateAttachement(image),
                    content: message,
                    ...misc
                }
            }))
        wrapFuncIntoWorkers(executableFile, args)
    }

    async fillContacts() {
        const executableFile = getAbsolutePath('./creators/contacts')
        const names = (await unpackFile('names')).flat(1)

        const shortedNames = names.slice(0, 500)

        var args = []

        for (var i = 100; i < 200; i++) {
            while (true) {
                var user1 = currentUserId
                var user2 = await getUserInstanceByLogin(shortedNames[i])

                var user2Id = user2.dataValues.id

                if (user1 === user2Id) continue

                const result = await contactsService.isContactExists(user1, user2Id)

                if (!result) break
            }
            args.push({ user1: user1, user2: user2Id })
        }
        wrapFuncIntoWorkers(executableFile, args);
    }
}


module.exports = new fillDB()