import { create } from 'zustand'
import { IChatStore } from '../types/Store'
import { IStoreFeedback, handleRequest } from '../../../shared'
import { api } from '../../../app'
import { IChat } from '../../../shared'

export type StoreType = IChatStore & IStoreFeedback

const baseUrl = 'content/chat/'

const initialState = {
    chats: [],
    currentChatId: 0,

    isError:false,
    isLoading:false
}

export const useChatStore = create<StoreType>()((set, get) => ({
    ...initialState,
    setCurrentChatId: (chatId: number) => {
        set({ currentChatId: chatId });
    },
    getChatWithUser: async (userId) => {
        const request = () => api.get(baseUrl + 'individual/?participantId=' + userId); 
        const chatId = await handleRequest<number>(request, set);

        if (!chatId) return;

        return chatId
    },
    getChat: async (chatId: number) => {
        const request = () => api.get(baseUrl + chatId);
        const chat = await handleRequest<IChat>(request, set);

        if (!chat) return;

        set((state) => ({
            chats: [...state.chats, {chat,id:chat.id}],
        }));
    },

    addParticipant: async (userId) => {
        const {currentChatId} = get()
        const request = () => api.post(baseUrl + currentChatId + '/participants'); 

        const response = await handleRequest(request, set);
    },
    removeParticipant: async (userId) => {
        const { currentChatId } = get()
        const request = () => api.delete(baseUrl + currentChatId + '/participants'); 

        const response = await handleRequest(request, set);

        if (!response) return
    },

    createGroupChat: async (participants, name, avatar) => {
        const request = () => api.post(baseUrl + 'group');
        await handleRequest(request, set);
    },
    editGroupChat: async (fields) => {
        const request = () => api.put(""); 
        await handleRequest(request, set);
    },



    addParticipantExternal: async (participant) => {

    },
    removeParticipantExternal: async (userId) => {

    },
    editGroupChatExternal: async (chatId, fields) => {

    },
}))

export default useChatStore
