import { create } from 'zustand'

import { IMessageStore } from '../types/Store'
import { IMessageContentItem } from '../types/Model'

import { api } from '../../../app'
import { IMessage, IStoreFeedback, handleRequest } from '../../../shared'
import { IMessagesApiResponse } from '../types/ApiResponse'

export type StoreType = IMessageStore & IStoreFeedback

const initialState = {
    messages: [],
    attachements: [],
    page: 0,
    messagesAmount:0,

    isLoading: false,
    isError: false
}

export const useMessageStore = create<StoreType>((set, get) => ({
    ...initialState,
    receiveMessages: async (chatId, limit) => {
        const { page } = get()
        const request = () => api.get(`content/chat/${chatId}/messages/?offset=${limit * page}&limit=${limit}`);
        const newMessages = await handleRequest<IMessagesApiResponse>(request, set);

        if (!newMessages) return;

        const convertedMessages: IMessageContentItem[] = newMessages.data.map((message) => {
            return {
                type: 'Message',
                data: message,
            };
        });


        set((state) => ({
            ...state,
            messages: {
                ...state.messages,
                [chatId]: [
                    ...(state.messages[chatId] || []),
                    ...convertedMessages
                ],
            },
            messagesAmount:newMessages.count
        }));
    },
    receiveAttachements: async (chatId, limit) => {
        const attachements = get().attachements
        const offset = attachements[chatId].length

        const request = () => api.get(`content/chat/${chatId}/attachements/?limit=${limit}&offset=${offset}`)
        const newAttachements = await handleRequest<IMessage[]>(request, set);

        if (!newAttachements) return;

        set((state) => ({
            attachements: {
                ...state.attachements,
                [chatId]: [
                    ...state.attachements[chatId],
                    ...newAttachements
                ],
            },
        }));
    },
    addMessage: async (chatId, message, attachement) => {
        const request = () => api.post(`content/chat/${chatId}/messages`, {
            json: {
                attachement: attachement,
                content: message
            }
        })

        const newMessage = await handleRequest<IMessage>(request, set);

        if (!newMessage) return;

        set((state) => ({
            messages: {
                ...state.messages,
                [chatId]: [
                    ...state.messages[chatId],
                    { type: 'Message', data: newMessage }
                ],
            },
        }));
    },
    addAttachement: async (chatId, attachement) => {
        const request = () => api.post(`content/chat/${chatId}/attachements`, {
            json: {
                attachement: attachement
            }
        })
        const newAttachement = await handleRequest<IMessage>(request, set);

        if (!newAttachement) return;

        set((state) => ({
            attachements: {
                ...state.attachements,
                [chatId]: [
                    ...state.attachements[chatId],
                    newAttachement
                ],
            },
        }));
    },
    addContentExternal: (chatId, contentItem) => {
        set((state) => ({
            messages: {
                ...state.messages,
                [chatId]: [
                    ...state.messages[chatId],
                    contentItem
                ],
            },
        }));
    },
    setPage: (page) => {
        set({ page: page })
    },
    setMessageRead: (chatId, messageId) => {
        const messages = get().messages

        const message = (messages[chatId].find((message) => message.type === 'Message' && message.data.id === messageId) as IMessageContentItem)

        if (!message) return

        message.data.isRead = true

        set((state) => ({
            messages: {
                ...state.messages,
                [chatId]: [
                    ...state.messages[chatId],
                    message
                ],
            },
        }));

    }
}));