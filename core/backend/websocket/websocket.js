const ws = require('ws');
const eventsQueries = require('../database/mongo/queries/eventsQueries');
const eventService = require('../service/eventService');

const wss = new ws.Server({
    port: 5001,
}, () => console.log('WS server started'));


wss.on('connection', (ws) => {
    ws.userId;
    ws.isAlive = true
    ws.on('message', async (message) => {
        message = JSON.parse(message);
        switch (message.type) {
            case 'initial': {
                ws.userId = message.data.userId;
                break;
            }
            case 'typing': {
                const { isTyping, chatId } = message.data;
                await eventService.setTyping(ws.userId, chatId, isTyping);
                break;
            }
            case 'messageRead': {
                const { messageId, chatId } = message.data;
                await eventService.setMessageRead(ws.userId, messageId,chatId);
                break;
            }
            default: {
                throw Error('WS: Incorrect event type');
            }
        }
    });
    
    ws.on('close',() => ws.isAlive = false)
    
    function sendEvents() {
        setTimeout(async () => {
            const events = await eventService.get(ws.userId);
            if (events.length > 0 && ws.isAlive) {
                ws.send(JSON.stringify(events), async (err) => {
                    if (err) {
                        console.log('Failed to send events:', err);
                        ws.close()
                        return
                    } else {
                        console.log(`Event ${events.map((event) => event.type)} sent successfully`);
                        await eventService.setEventsSent(events);
                    }
                });
            }
            sendEvents();
        }, 100);
    }
    sendEvents()
});
