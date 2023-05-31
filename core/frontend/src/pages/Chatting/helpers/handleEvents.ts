import { IEvent } from "../../../features/Events/types/Event";

import { useChatStore, useContactListStore, useInboxStore, useMessageStore } from "../../../entities";

export function handleEvent(event: IEvent) {
    console.log(event.type)
    switch (event.type) {
        case 'received_message': {
            const receivedMessageData = event.data;
            const message = receivedMessageData.message;
            const messageChatId = receivedMessageData.chatId;

            const { addItemWS } = useMessageStore.getState()
            const { updateMessage } = useInboxStore.getState()

            updateMessage(message, messageChatId, true)
            addItemWS(messageChatId, { type: 'Message', data: message })
            break;
        }


        case 'message_read': {
            const readMessageData = event.data;
            const msgId = readMessageData.msgId;
            const chatId = readMessageData.chatId;

            const { setMessageRead } = useMessageStore.getState()

            setMessageRead(chatId, msgId)

            break;
        }


        case 'contact': {
            const contactEventData = event.data;
            const contact = contactEventData.contact;
            const status = contactEventData.status;

            const { updateContactStatus, addOrUpdateContact: pushContact } = useContactListStore.getState()

            if (status === 'pending') pushContact(contact)
            else updateContactStatus(contact.id, status)

            break;
        }
        case 'typing': {
            const typingEventData = event.data;
            const chatId = typingEventData.chatId;
            const typingState = typingEventData.typingState;
            const typerId = typingEventData.typerId;

            const { addTypingUser, removeTypingUser } = useChatStore.getState()

            if (typingState) addTypingUser(chatId, typerId)
            else removeTypingUser(chatId, typerId)

            break;
        }


        case 'participant_invited': {
            const participantInvitedData = event.data;
            const invitedChatId = participantInvitedData.chatId;
            const participant = participantInvitedData.participant;

            const { addParticipantWS } = useChatStore.getState()

            addParticipantWS(invitedChatId, participant)

            break;
        }

        case 'participant_removed': {
            const participantRemovedData = event.data;
            const removedChatId = participantRemovedData.chatId;
            const removedParticipantId = participantRemovedData.participantId;

            const { removeParticipantWS } = useChatStore.getState()

            removeParticipantWS(removedChatId, removedParticipantId)
            break;
        }
        case 'excluded_from_chat': {
            const excludedFromChatData = event.data;
            const excludedChatId = excludedFromChatData.chatId;

            const { removeChat } = useChatStore.getState()

            removeChat(excludedChatId)
            break;
        }
        case 'invited_to_chat': {
            const invitedToChatData = event.data;
            const invitedChat = invitedToChatData.chat;

            const { addChat } = useChatStore.getState()

            addChat(invitedChat)
            break;
        }
        case 'chat_updated': {
            const chatUpdatedData = event.data;
            const { name, avatar } = chatUpdatedData;
            const updatedChatId = chatUpdatedData.chatId;

            const { editGroupChatWS } = useChatStore.getState()
            const {updateApperance} = useInboxStore.getState()
            console.log(chatUpdatedData)
            editGroupChatWS(updatedChatId, name, avatar)
            updateApperance(updatedChatId,name,avatar)
            break;
        }
        default:
            throw Error('Unexpected event')
    }
    // notifications.show({ message: `Event ${event.type}` })
}