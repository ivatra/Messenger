import { create } from 'zustand'

import { IInboxStore } from '../types/Store'
import { IStoreFeedback, handleRequest } from '../../../shared'
import { api } from '../../../app'
import { updateInboxPinnedState, updateInboxMessage } from './updaters'
import { IInbox } from '../types/Model'
import { IReceiveInboxes } from '../types/ApiResponse'

export type StoreType = IInboxStore & IStoreFeedback

const baseUrl = 'content/pages/inbox'

const initialState = {
    isLoading: false,
    isError: false,
    inboxes: [],
    pinnedInboxes: [],
    inboxesTotalCount: 0
}


const useInboxStore = create<StoreType>()((set, get) => ({
    ...initialState,
    pin: async (id) => {
        const request = () => api.post(`${baseUrl}/${id}/pin`)

        await handleRequest<IInbox>(request, set)

        if (get().isError) return
        
        const { inboxes, pinnedInboxes } = get()

        const inbox = inboxes.find(i => i.id === id) || pinnedInboxes.find(i => i.id === id)

        if (!inbox) return

        const wasPinned = inbox.isPinned

        inbox.isPinned = !wasPinned

        set({
            inboxes: wasPinned ? [...inboxes,inbox] : inboxes.filter(i => i.id !== id),
            pinnedInboxes: wasPinned ? pinnedInboxes.filter(i => i.id !== id) : [...pinnedInboxes, inbox]
        })
    },
    receive: async ({ page, limit }) => {
        const inboxesLen = get().inboxes.length
        
        const request = () => api.get(`${baseUrl}?limit=${limit}&offset=${inboxesLen}`);

        const response = await handleRequest<IReceiveInboxes>(request, set)

        if (!response) return

        set(state => ({
            inboxesTotalCount: response.count,
            inboxes: [...state.inboxes, ...response.inboxes]
        }));


    },
    receivePinned: async () => {

        const request = () => api.get(baseUrl + '/pinned');

        const response = await handleRequest<IInbox[]>(request, set)

        if (!response) return

        set({ pinnedInboxes: response })

    },
    updateMessage: (message, inboxId) => {
        set((state) => {
            const updatedInboxes = updateInboxMessage(state, message, inboxId)
            return { ...state, inboxes: updatedInboxes };
        });
    },
}))

export default useInboxStore

