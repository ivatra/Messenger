import { create } from 'zustand';
import produce from "immer";

import { IMessageStore, IMessageStoreVariables } from '../types/MessageStoreType';
import { IMessagesApiResponse } from '../types/MessageApiResponse';
import { createMockMessage } from '../helpers/createMessage';
import { IMessage } from '../types/MessageModel';

import { api } from '../../../app';
import { SharedHelpers } from '../../../shared';


const initialState: IMessageStoreVariables = {
    messages: { byId: {}, idByChatId: {}, commLenByChatId: {} },
    state: 'idle'
}

export const useMessageStore = create<IMessageStore>((set, get) => ({
    ...initialState,
    receiveByOffset: async (chatId, offset, limit) => {
        const { messages } = get()

        const additionalOffset = messages.commLenByChatId[chatId]

        const request = () => api.get(`content/chat/${chatId}/messages/?offset=${offset + additionalOffset}&limit=${limit}`);

        const newMessages = await SharedHelpers.handleRequest<IMessagesApiResponse>(request, set);

        if (!newMessages) return

        const msgData = newMessages.data

        set(
            produce((state: IMessageStore) => {
                Object.assign(state.messages.byId, msgData, state.messages.byId)

                const chatMsgs = state.messages.idByChatId[chatId]

                for (const [key, value] of Object.entries(newMessages)) {
                    chatMsgs.add(Number(key))
                }
<<<<<<< HEAD
            })
        );
    },
    receiveById: async (msgId) => {
        const request = () => api.get(`content/chat/-1/messages/${msgId}`);
        const message = await SharedHelpers.handleRequest<IMessage>(request, set);

        if (!message) return

        set(
            produce((state: IMessageStore) => {
                state.messages.byId[message.id] = message
                state.messages.idByChatId[message.chatId].add(message.id)
            })
        );

    },
    sendMessage: async (userId, chatId, message, attachment) => {
        const addMessage = get().addMessage

        const createMock = () => {
            const randomNumber = Date.now()

            const newMessage = createMockMessage(userId, randomNumber, attachment, message);

            addMessage(chatId, newMessage)

            return newMessage

        }
        const sendRequest = async () => {
            const formData = new FormData();

            formData.append('content', message);

            if (attachment) {
                formData.append('attachment', attachment, attachment.name);
            }

            const request = () =>
                api.post(`content/chat/${chatId}/messages`, {
                    body: formData,
                });

            const response = await SharedHelpers.handleRequest<IMessage>(request, set);

            return response
        }

        const updateState = (response: IMessage | undefined, newMessage: IMessage) => {
            if (response) {
                set(produce((state: IMessageStore) => {
                    delete state.messages.byId[newMessage.id]
                    state.messages.idByChatId[newMessage.chatId].delete(newMessage.id)

                    addMessage(response.chatId, newMessage)
                }));
            } else {
                set(produce((state: IMessageStore) => {
                    state.messages.byId[newMessage.id].status = 'error'
                }));
            }
        }

        const newMessage = createMock()
        const response = await sendRequest()
        updateState(response, newMessage)


    },
    addMessage(chatId, message) {
        produce((state: IMessageStore) => {
            state.messages.byId[message.id] = message
            state.messages.idByChatId[chatId].add(message.id)
            state.messages.commLenByChatId[chatId]++
        })
    },
    setMessageRead: (messageId) => {
        set(produce((state: IMessageStore) => {
            state.messages.byId[messageId].isRead = true
        }));
    },
    clearMessagesByChatId(chatId) {
        set(produce((state: IMessageStore) => {
            const msgIds = state.messages.idByChatId[chatId]

            for (var id of msgIds) {
                delete state.messages.byId[id]
            }
            msgIds.clear()
=======
                return item;
            });
            if(state.items[chatId]){
                state.items[chatId].items = updatedItems;
            }
>>>>>>> new!
        }));
    },
}));
