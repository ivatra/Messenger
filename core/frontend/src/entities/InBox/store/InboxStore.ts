import { create } from 'zustand'
import produce from "immer";

import { IInboxStore } from '../types/Store'
import { IStoreFeedback, handleRequest } from '../../../shared'
import { api } from '../../../app'
import { IInbox } from '../types/Model'
import { IMatchedInboxesResponse, IInboxesResponse, IPinnedInboxesResponse } from '../types/ApiResponse'
import { useChatStore } from '../../Chat';

export type StoreType = IInboxStore & IStoreFeedback

const baseUrl = 'content/pages/inbox'

const initialState = {
    isLoading: false,
    isError: false,
    inboxes: [],
    matchedInboxes: [],
    pinnedInboxes: [],
    inboxesTotalCount: 0,
    isMatched: false
}

function findInboxByChat(state: StoreType, chatId: number) {
    return state.inboxes.find((inbox) => inbox.chat.id === chatId)
        || state.pinnedInboxes.find((inbox) => inbox.chat.id === chatId)
}

const useInboxStore = create<StoreType>()((set, get) => ({
    ...initialState,
    pin: async (id) => {
        const request = () => api.post(`${baseUrl}/${id}/pin`);

        await handleRequest<IInbox>(request, set);

        if (get().isError) return;

        const { inboxes, pinnedInboxes, matchedInboxes } = get();

        const inbox = inboxes.find((i) => i.id === id) ||
            pinnedInboxes.find((i) => i.id === id) ||
            matchedInboxes.find((i) => i.id === id);

        if (!inbox) return;

        const wasPinned = inbox.isPinned;

        set({
            inboxes: wasPinned
                ? [...inboxes, { ...inbox, isPinned: !wasPinned }]
                : inboxes.filter((i) => i.id !== id),
            pinnedInboxes: wasPinned
                ? pinnedInboxes.filter((i) => i.id !== id)
                : [...pinnedInboxes, { ...inbox, isPinned: !wasPinned }],
            matchedInboxes: matchedInboxes.map((i) => {
                if (i.id === id) {
                    return { ...i, isPinned: !wasPinned };
                }
                return i;
            }),
        });
    },

    receive: async (limit) => {
        const inboxesLen = get().inboxes.length

        const request = () => api.get(`${baseUrl}?limit=${limit}&offset=${inboxesLen}`);

        const response = await handleRequest<IInboxesResponse>(request, set)

        if (!response) return

        set(state => ({
            inboxesTotalCount: response.count,
            inboxes: [...state.inboxes, ...response.inboxes]
        }));
    },
    receivePinned: async () => {
        const request = () => api.get(baseUrl + '/pinned');

        const response = await handleRequest<IPinnedInboxesResponse>(request, set)

        if (!response) return

        set({ pinnedInboxes: response })

    },
    receiveByChat: async (chatId) => {
        const addChat = useChatStore.getState().addChat
        const request = () => api(baseUrl + `/bychat/?chatId=${chatId}`)

        const response = await handleRequest<IInbox>(request, set)

        if (!response) return

        if (response.isPinned) {
            set(produce((state: StoreType) => {
                state.pinnedInboxes.push(response)
            }));
        } else {
            set(produce((state: StoreType) => {
                state.inboxes.push(response)
            }));
        }
        addChat(response.chat)
    },
    receiveMatched: async (message) => {
        const request = () => api.get(`content/search/inbox/?message=${message}`);
        const inboxes = await handleRequest<IMatchedInboxesResponse>(request, set);

        if (get().isError || inboxes === undefined) return;

        if (Array.isArray(inboxes) && inboxes.length === 0) set({ isMatched: false });
        else set({ isMatched: true });

        set({ matchedInboxes: inboxes });
    },

    decrementCountUnreadMsgs: (chatId) => {
        set(produce((
            state: StoreType) => {

            const foundInbox = findInboxByChat(state, chatId)

            if (!foundInbox || foundInbox?.countUnreadMsgs < 1) return

            foundInbox.countUnreadMsgs--
        }));
    },
    updateMessage: (message, chatId, isExternal) => {
        const { receiveByChat } = get()

        set(produce((
            state: StoreType) => {

            const foundInbox = findInboxByChat(state, chatId)

            if (!foundInbox) {
                receiveByChat(chatId)
            } else {
                foundInbox.message = message
                if (isExternal) {
                    foundInbox.countUnreadMsgs++
                }
            }
        }));
    },
}))

export default useInboxStore

