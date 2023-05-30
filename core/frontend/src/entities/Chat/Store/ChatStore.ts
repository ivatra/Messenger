import { create } from 'zustand';
import produce from "immer";

import { IChatStoreVariables, IChatStoreActions, ChatStoreType } from '../types/ChatStoreType';
import { IChat, IChatParticipant } from '../types/ChatModel';

import { api } from '../../../app';
import { SharedHelpers } from '../../../shared';


const baseUrl = 'content/chat/'

const initialState: IChatStoreVariables = {
    chats: [],
    groupChatCreationOpened: false,
    state: 'idle'
}

export const useChatStore = create<ChatStoreType>((set) => ({
    ...initialState,
    receiveChatIdByUserId: async (userId) => {
        const request = () => api.get(baseUrl + 'individual/?participantId=' + userId);

        const chatId = await SharedHelpers.handleRequest<number>(request, set);

        return chatId
    },
    receiveByChatId: async (chatId: number) => {
        const request = () => api.get(baseUrl + chatId);

        const chat = await SharedHelpers.handleRequest<IChat>(request, set);

        if (!chat) return

        set(produce((state: ChatStoreType) => {
            state.chats[chatId] = chat
        }));
    },
    createGroupChat: async (participantsIds, fields) => {
        const formData = new FormData();
        if (fields.avatar) {
            formData.append('avatar', fields.avatar);
        }
        if (fields.name) {
            formData.append('name', fields.name);
        }

        formData.append('participants', JSON.stringify(participantsIds));

        const request = () => api.post(baseUrl + 'group', { body: formData });
        const response = await SharedHelpers.handleRequest<IChat>(request, set);

        if (!response) return;

        set(produce((state: ChatStoreType) => {
            state.chats[response.id] = response
            state.groupChatCreationOpened = false;
        }));
    },
    addParticipant: async (chatId, userId) => {
        const request = () => api.post(baseUrl + chatId + '/participants', { json: { userId: userId } });

        const response = await SharedHelpers.handleRequest<IChatParticipant>(request, set);

        if (!response) return;

        set(produce((state: ChatStoreType) => {
            state.chats[chatId].participants[response.id] = response
        }));
    },
    kickParticipant: async (chatId, userId) => {
        const request = () => api.delete(baseUrl + chatId + `/participants/${userId}`);
        const response = await SharedHelpers.handleRequest(request, set);

        if (!response) return;

        set(produce((state: ChatStoreType) => {
            delete state.chats[chatId].participants[userId]
        }));
    },
    setGroupChatCreationOpened: (value) => {
        set({ groupChatCreationOpened: value });
    },
    editGroupChat: async (chatId, fields, doHttp) => {
        const formData = new FormData();
        if (fields.avatar) {
            formData.append('avatar', fields.avatar);
        }
        if (fields.name) {
            formData.append('name', fields.name);
        }

        if (doHttp) {
            const request = () => api.put(baseUrl + chatId, { body: formData });

            await SharedHelpers.handleRequest(request, set);
        }

    },
    addParticipantWS(chatId, participant) {
        set(produce((state: ChatStoreType) => {
            state.chats[chatId].participants[participant.id] = participant
        }));
    },
    kickParticipantWS(chatId, participantId) {
        set(produce((state: ChatStoreType) => {
            delete state.chats[chatId].participants[participantId]
        }));
    },
    removeChat: (chatId) => {
        set(produce((state: ChatStoreType) => {
            delete state.chats[chatId]
        }));

        // TODO: Delete messages
    },
    addTypingUser: (chatId, participantId) => {
        set(produce((state: ChatStoreType) => {
            const currentChat = state.chats[chatId]

            if (!currentChat.typingUsers) {
                currentChat.typingUsers = []
            }

            if (currentChat && !currentChat.typingUsers.includes(participantId)) {
                currentChat.typingUsers.push(participantId);
            }
        }));
    },
    removeTypingUser: (chatId, participantId) => {
        set(produce((state: ChatStoreType) => {
            const currentChat = state.chats[chatId]

            if (!currentChat.typingUsers) return

            if (currentChat) {
                currentChat.typingUsers = currentChat.typingUsers.filter(typingUserId => typingUserId !== participantId);
            }
        }));
    },
}));

export default useChatStore;
