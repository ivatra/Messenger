import { create } from 'zustand';
import produce from "immer";

import { IInboxActions, IInboxVariables } from '../types/InboxStoreType';
import { IInbox } from '../types/InboxModel';
import { IInboxesResponse } from '../types/InboxApiResponse';

import { api } from '../../../app';
import { SharedHelpers } from '../../../shared';

const baseUrl = 'content/pages/inbox'

const initialState: IInboxVariables = {
    inboxes: [],
    matchedInboxes: [],
    inboxesTotalCount: 0,
    state: 'idle'
}


type InboxStoreType = IInboxActions & IInboxVariables

const useInboxStore = create<InboxStoreType>()((set, get) => ({
    ...initialState,
    pin: async (inboxId) => {
        const request = () => api.post(`${baseUrl}/${inboxId}/pin`);

        await SharedHelpers.handleRequest<IInbox>(request, set);

        if (get().state === 'error') return

        const { inboxes } = get();

        if (inboxes[inboxId]) {
            set(produce((state: InboxStoreType) => {
                inboxes[inboxId].isPinned = !inboxes[inboxId].isPinned
            }));
        }
    },
    receivePinned: async () => {
        const request = () => api.get(baseUrl + '/pinned');

        const response = await SharedHelpers.handleRequest<IInbox>(request, set)

        if (!response) return

        set(produce((state) => {
            state.inboxes.shift(response)
        }));

    },
    receiveByOffset: async (limit, offset) => {
        const request = () => api.get(`${baseUrl}?limit=${limit}&offset=${offset}`);

        const response = await SharedHelpers.handleRequest<IInboxesResponse>(request, set)

        if (!response) return

        set(produce((state: InboxStoreType) => {
            Object.assign(state.inboxes, response.inboxes, state.inboxes)
            state.inboxesTotalCount = response.count
        }));
    },
    receiveByChatId: async (chatId) => {
        const request = () => api(baseUrl + `/bychat/?chatId=${chatId}`)

        const response = await SharedHelpers.handleRequest<IInbox>(request, set)

        if (!response) return

        set(produce((state: InboxStoreType) => {
            Object.assign(state.inboxes, response, state.inboxes)
        }));
    },
    receiveBySearchTerm: async (searchTerm) => {
        const request = () => api.get(`content/search/inbox/?message=${searchTerm}`);

        const response = await SharedHelpers.handleRequest<IInbox>(request, set);

        if (!response) return

        set({ matchedInboxes: response });
    },
    updateMsgId: (inboxId, msgId) => {
        set(produce((state: InboxStoreType) => {
            state.inboxes[inboxId].messageId = msgId
        }));
    },
}))

export default useInboxStore

