import { create } from 'zustand'
import { IChatStore } from '../types/Store'
import { IChatParticipant, IStoreFeedback, handleRequest } from '../../../shared'
import { api } from '../../../app'
import { IChat } from '../../../shared'

export type StoreType = IChatStore & IStoreFeedback

const baseUrl = 'content/chat/'

const initialState = {
    chats: [],
    currentChatId: 0,

    isError: false,
    isLoading: false
}

export const useChatStore = create<StoreType>()((set, get) => ({
    ...initialState,
    setCurrentChatId: (chatId: number) => {
        set({ currentChatId: chatId });
    },
    receiveChatWithUser: async (userId) => {
        const request = () => api.get(baseUrl + 'individual/?participantId=' + userId);
        const chatId = await handleRequest<number>(request, set);

        if (!chatId) return;

        return chatId
    },
    receiveChat: async (chatId: number) => {
        const request = () => api.get(baseUrl + chatId);
        const chat = await handleRequest<IChat>(request, set);

        if (!chat || get().chats[chatId]) return;

        get().addChat(chat)
    },
    addParticipant: async (chatId, participant) => {
        const request = () => api.post(baseUrl + chatId + '/participants', {
            json: {
                participantId: participant.user.id
            }
        });
        const response = await handleRequest(request, set);

        const foundParticipant = get().chats[chatId].participants.filter((part) => part.id === participant.id)

        if (!response || foundParticipant) return

        set((state) => ({
            chats: {
                ...state.chats,
                [chatId]: {
                    ...state.chats[chatId],
                    participants: [...state.chats[chatId].participants, participant]
                }
            }
        }));

    },
    removeParticipant: async (chatId, userId) => {
        const request = () => api.delete(baseUrl + chatId + `/participants/${userId}`);
        const response = await handleRequest(request, set);

        if (!response) return;

        set((state) => {
            const updatedParticipants = state.chats[chatId].participants.filter(
                (participant) => participant.user.id !== userId
            );

            return {
                chats: {
                    ...state.chats,
                    [chatId]: {
                        ...state.chats[chatId],
                        participants: updatedParticipants
                    }
                }
            };
        })

    },

    createGroupChat: async (participants, fields) => {
        const formData = new FormData();

        if (fields.avatar) {
            formData.append('avatar', fields.avatar);
        }

        if (fields.name) {
            formData.append('name', fields.name);
        }
        formData.append('participants', JSON.stringify(participants))

        const request = () => api.post(baseUrl + 'group', { body: formData });
        const response = await handleRequest<IChat>(request, set);

        if (!response) return;

        get().addChat(response)
    },
    editGroupChat: async (chatId, fields) => {
        const formData = new FormData();

        if (fields.avatar) {
            formData.append('avatar', fields.avatar);
        }

        if (fields.name) {
            formData.append('name', fields.name);
        }

        const request = () => api.put(baseUrl + chatId, {
            body: formData
        });

        const response = await handleRequest(request, set);

        if (!response) return;

        set((state) => {
            const updatedChat = {
                ...state.chats[state.currentChatId],
                groupChat: {
                    ...state.chats[state.currentChatId].groupChat,
                    ...fields
                }
            };

            return {
                ...state,
                chats: {
                    ...state.chats,
                    [state.currentChatId]: updatedChat
                }
            };
        });
    },
    addParticipantExternal: async (chatId, participant) => {
        const chats = get().chats

        if (!chats[chatId]) return

        set((state) => ({
            chats: {
                ...state.chats,
                [chatId]: {
                    ...state.chats[chatId],
                    participants: [...state.chats[chatId].participants, participant]
                }
            }
        }));
    },

    addChat: (chat) => {
        set((state) => ({
            chats: {
                ...state.chats,
                [chat.id]: { ...chat, typingUsers: [] },
            }
        }));
    },
    removeChat: (chatId) => {
        set((state) => {
            const updatedChats = { ...state.chats };
            delete updatedChats[chatId];
            return {
                chats: updatedChats
            };
        });
    },
    removeParticipantExternal: async (chatId, participantId) => {
        const chats = get().chats


        if (!chats[chatId]) return;

        set((state) => {
            const updatedParticipants = state.chats[chatId].participants.filter(
                (participant) => participant.id !== participantId
            );

            return {
                chats: {
                    ...state.chats,
                    [chatId]: {
                        ...state.chats[chatId],
                        participants: updatedParticipants
                    }
                }
            };
        });
    },

    editGroupChatExternal: async (chatId, fields) => {
        if (!get().chats[chatId]) return

        set((state) => ({
            chats: {
                ...state.chats,
                [chatId]: {
                    ...state.chats[chatId],
                    groupChat: {
                        ...state.chats[chatId].groupChat,
                        ...fields
                    }
                }
            }
        }));
    },

    addTypingUser: (chatId, userId) => {
        set((state) => {
            const chat = state.chats[chatId];

            const typingUser = chat.participants.find((participant) => participant.user.id === userId);

            if (!typingUser) {
                return state;
            }

            if (chat.typingUsers) {
                const foundTypingUser = chat.typingUsers.find((participant) => participant.user.id === userId)
                if (foundTypingUser) {
                    return state
                }
            }

            const updatedChat = {
                ...chat,
                typingUsers: [...chat.typingUsers, typingUser],
            };

            return {
                chats: {
                    ...state.chats,
                    [chatId]: updatedChat,
                },
            };
        });
    },

    removeTypingUser: (chatId, userId) => {
        set((state) => {
            const chat = state.chats[chatId];

            if (!chat.typingUsers) return state

            const updatedTypingUsers = chat.typingUsers.filter((participant) => participant.user.id !== userId);

            if (!updatedTypingUsers) return state

            const updatedChat = {
                ...chat,
                typingUsers: updatedTypingUsers,
            };

            return {
                chats: {
                    ...state.chats,
                    [chatId]: updatedChat,
                },
            };
        });
    }
}))

export default useChatStore
