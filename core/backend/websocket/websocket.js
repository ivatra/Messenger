const ws = require('ws');
const {userSockets} = require('./userSocket')

const eventService = require('../service/eventService');

const wss = new ws.Server({
    port: 5001,
}, () => console.log('WS server started'));

// Map to store the WebSocket connection of each user.

wss.on('connection', (ws) => {
    ws.userId;
    ws.isAlive = true;

    ws.on('message', async(message) => {
        message = JSON.parse(message);
        switch (message.type) {
            case 'initial': {
                ws.userId = message.data.userId;
                userSockets.set(ws.userId, ws); // Store the WebSocket connection for this user.
                break;
            }
            case 'typing': {
                const { isTyping, chatId } = message.data;
                await eventService.setTyping(ws.userId, chatId, isTyping);
                break;
            }
            case 'message_read': {
                const { messageId, chatId } = message.data;
                await eventService.setMessageRead(ws.userId, messageId, chatId);
                break;
            }
            default: {
                throw Error('WS: Incorrect event type');
            }
        }
    });

    ws.on('close', () => {
        ws.isAlive = false;
        userSockets.delete(ws.userId); // Remove the WebSocket connection for this user.
    });
});

module.exports.userSockets = userSockets;