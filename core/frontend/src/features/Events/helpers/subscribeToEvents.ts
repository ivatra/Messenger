import { IEvent } from "../types/Event";

import { useChatStore, useContactListStore, useInboxStore, useMessageStore } from "../../../entities";
import { SharedConsts } from "../../../shared";


function handleEvent(event: IEvent) {
    console.log(event.type)
    switch (event.type) {
        case 'received_message': {
            const message = event.data.message;
            const messageChatId = event.data.chatId;

            const { addItemWS } = useMessageStore.getState()
            const { updateMessage } = useInboxStore.getState()

            updateMessage(message, messageChatId, true)
            addItemWS(messageChatId, { type: 'Message', data: message })
            break;
        }


        case 'message_read': {
            const msgId = event.data.msgId;
            const chatId = event.data.chatId;

            const { setMessageRead } = useMessageStore.getState()

            setMessageRead(chatId, msgId)

            break;
        }


        case 'contact': {
            const contact = event.data.contact;
            const status = event.data.status;

            const { updateContactStatus, addContact: pushContact } = useContactListStore.getState()

            if (status === 'pending') pushContact(contact)
            else updateContactStatus(contact.id, status)

            break;
        }
        case 'typing': { //changed
            const chatId = event.data.chatId;
            const typingState = event.data.typingState;
            const typerId = event.data.participantTyperId

            const { addTypingUser, removeTypingUser } = useChatStore.getState()

            if (typingState) addTypingUser(chatId, typerId)
            else removeTypingUser(chatId, typerId)

            break;
        }


        case 'participant_invited': {
            const invitedChatId = event.data.chatId;
            const participant = event.data.participant;

            const { addParticipantWS } = useChatStore.getState()

            addParticipantWS(invitedChatId, participant)

            break;
        }

        case 'participant_removed': {
            const removedChatId = event.data.chatId;
            const removedParticipantId = event.data.participantId;

            const { removeParticipantWS } = useChatStore.getState()

            removeParticipantWS(removedChatId, removedParticipantId)
            break;
        }
        case 'excluded_from_chat': { //changed
            const inboxId = event.data.inboxId;

            const removeInbox = useInboxStore.getState().removeInbox

            removeInbox(inboxId)
            break;
        }
        case 'invited_to_chat': {
            const newInbox = event.data.inbox;

            const addInbox = useInboxStore.getState().addInbox

            addInbox(newInbox)
            break;
        }
        case 'chat_updated': {
            const { name, avatar } = event.data;
            const updatedChatId = event.data.chatId;

            const { editGroupChatWS } = useChatStore.getState()

            editGroupChatWS(updatedChatId, name, avatar)
            break;
        }
        default:
            throw Error('Unexpected event')
    }
    // notifications.show({ message: `Event ${event.type}` })
}

export function subscribeToEvents(socket: React.MutableRefObject<WebSocket | null>, userId: string) {
    socket.current = new WebSocket(SharedConsts.WS_URL);

    socket.current.onopen = () => {
        const message = {
            type: 'initial',
            data: {
                userId: userId,
            },
        };
        socket?.current?.send(JSON.stringify(message));
    };

    socket.current.onmessage = (message: MessageEvent) => {
        const events: IEvent[] = JSON.parse(message.data)
        events.forEach((event) => handleEvent(event))
    };

    socket.current.onclose = () => {
        socket.current = null
        console.log('WebSocket disconnected');
    };

}
