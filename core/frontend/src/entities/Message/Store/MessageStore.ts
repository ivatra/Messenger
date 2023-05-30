import { create } from 'zustand';
import produce from "immer";

import { IMessageStore, IMessageStoreVariables } from '../types/MessageStoreType';
import { IMessagesApiResponse } from '../types/MessageApiResponse';
import { createMockMessage } from '../helpers/createMessage';
import { IMessage } from '../types/MessageModel';

import { api } from '../../../app';
import { SharedHelpers } from '../../../shared';


const initialState: IMessageStoreVariables = {
    messages: { byId: {}, idByChatId: {} },
    state: 'idle'
}

export const useMessageStore = create<IMessageStore>((set, get) => ({
    ...initialState,
    receiveByOffset: async (chatId, offset, limit) => {
        const request = () => api.get(`content/chat/${chatId}/messages/?offset=${offset}&limit=${limit}`);

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
    addMessage(chatId, message) {
        produce((state: IMessageStore) => {
            state.messages.byId[message.id] = message
            state.messages.idByChatId[chatId].add(message.id)
        })
    },
    sendMessage: async (userId, chatId, message, attachment) => {
        const createMock = () => {
            const randomNumber = Date.now()

            const newMessage = createMockMessage(userId, randomNumber, attachment, message);

            set(produce((state: IMessageStore) => {
                state.messages.byId[newMessage.id] = newMessage
            }));

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

                    state.messages.byId[response.id] = response
                    state.messages.idByChatId[newMessage.chatId].add(response.id)
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
    setMessageRead: (messageId) => {
        set(produce((state: IMessageStore) => {
            state.messages.byId[messageId].isRead = true
        }));
    },
}));
