import { create } from 'zustand';
import produce from "immer";

import { IChatStore } from '../types/Store';

import { api } from '../../../app';
import { useInboxStore } from '../../InBox';

import { SharedTypes, SharedHelpers } from '../../../shared';

export type StoreType = IChatStore & SharedTypes.IStoreFeedback

const baseUrl = 'content/chat/'

const initialState = {
    chats: [],
    currentChatId: 0,
    isGroupChatCreationOpened: false,

    isError: false,
    isLoading: false
}

export const useChatStore = create<StoreType>()((set, get) => ({
    ...initialState,
    setCurrentChatId: (chatId) => {
        set({ currentChatId: chatId });
    },
    receiveChatWithUser: async (userId) => {
        const request = () => api.get(baseUrl + 'individual/?participantId=' + userId);
        const chatId = await SharedHelpers.handleRequest<number>(request, set);

        if (!chatId) return;

        return chatId
    },
    receiveChat: async (chatId: number) => {
        const { addChat } = get()

        const request = () => api.get(baseUrl + chatId);

        const chat = await SharedHelpers.handleRequest<SharedTypes.IChat>(request, set);

        if (!chat || get().chats[chatId]) return;

        addChat(chat)
    },
    addParticipant: async (chatId, participant) => {
        const request = () =>
            api.post(baseUrl + chatId + '/participants', {
                json: {
                    participantId: participant.user.id,
                },
            });
        const response = await SharedHelpers.handleRequest(request, set);

        const foundParticipant = get().chats[chatId].participants.find((part) => part.id === participant.id);

        if (!response || foundParticipant) return;

        set(
            produce((state: StoreType) => {
                state.chats[chatId].participants.push(participant);
            })
        );
    },
    removeParticipant: async (chatId, userId) => {
        const request = () => api.delete(baseUrl + chatId + `/participants/${userId}`);
        const response = await SharedHelpers.handleRequest(request, set);

        if (!response) return;

        set(
            produce((state: StoreType) => {
                state.chats[chatId].participants = state.chats[chatId].participants.filter(
                    (participant) => participant.user.id !== userId
                );
            })
        );
    },
    createGroupChat: async (participants, fields) => {
        const { receiveByChat } = useInboxStore.getState()

        const formData = new FormData();

        if (fields.avatar) {
            formData.append('avatar', fields.avatar);
        }

        if (fields.name) {
            formData.append('name', fields.name);
        }

        const participantsIds = participants.map((part) => part.id)

        formData.append('participants', JSON.stringify(participantsIds));
        
        const request = () => api.post(baseUrl + 'group',{body:formData});

        const response = await SharedHelpers.handleRequest<SharedTypes.IChat>(request, set);

        if (!response) return;

        set(
            produce((state: StoreType) => {
                state.chats[response.id] = { ...response, typingUsers: [] };
                state.isGroupChatCreationOpened = false
            })
        );
        receiveByChat(response.id)
    },
    editGroupChat: async (chatId, fields) => {
        const formData = new FormData();
        //TODO: implement web socket request on group chat change
        if (fields.avatar) {
            formData.append('avatar', fields.avatar);
        }

        if (fields.name) {
            formData.append('name', fields.name);
        }

        const request = () =>
            api.put(baseUrl + chatId, {
                body: formData,
            });
        await SharedHelpers.handleRequest(request, set);

    },
    addParticipantWS: async (chatId, participant) => {
        const chats = get().chats;

        if (!chats[chatId]) return;

        set(
            produce((state: StoreType) => {
                state.chats[chatId].participants.push(participant);
            })
        );
    },

    addChat: (chat) => {
        set(
            produce((state: StoreType) => {
                state.chats[chat.id] = { ...chat, typingUsers: [] };
            })
        );
    },

    removeChat: (chatId) => {
        set(
            produce((state: StoreType) => {
                delete state.chats[chatId];
            })
        );
    },

    removeParticipantWS: async (chatId, participantId) => {
        const chats = get().chats;

        if (!chats[chatId]) return;

        set(
            produce((state: StoreType) => {
                state.chats[chatId].participants = state.chats[chatId].participants.filter(
                    (participant) => participant.id !== participantId
                );
            })
        );
    },

    editGroupChatWS: async (chatId, name, avatar) => {
        if (!get().chats[chatId] || (!name && !avatar)) return;

        set(
            produce((state: StoreType) => {
                state.chats[chatId].groupChat = { ...state.chats[chatId].groupChat, ...{ name, avatar } };
            })
        );
    },

    addTypingUser: (chatId, userId) => {
        set(
            produce((state: StoreType) => {
                const chat = state.chats[chatId];

                const typingUser = chat && chat.participants.find((participant) => participant.user.id === userId);

                if (!typingUser || chat.typingUsers.find((participant) => participant.user.id === userId)) {
                    return;
                }

                chat.typingUsers.push(typingUser);
            })
        );
    },

    removeTypingUser: (chatId, userId) => {
        set(
            produce((state: StoreType) => {
                const chat = state.chats[chatId];

                if (!chat || !chat.typingUsers) return;

                chat.typingUsers = chat.typingUsers.filter((participant) => participant.user.id !== userId);
            })
        );
    },

    setGroupChatCreationOpened: (value) => {
        set({ isGroupChatCreationOpened: value })
    }
}))

export default useChatStore
