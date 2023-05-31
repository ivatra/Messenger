import { create } from 'zustand';
import produce from "immer";

import { IInboxActions, IInboxVariables, InboxStoreType } from '../types/InboxStoreType';
import { IDictInbox } from '../types/InboxModel';
import { IInboxesResponse } from '../types/InboxApiResponse';

import { api } from '../../../app';
import { SharedHelpers } from '../../../shared';
import { useChatStore } from '../..';

const baseUrl = 'content/pages/inbox'

const initialState: IInboxVariables = {
    inboxes: [],
    matchedInboxes: [],
    inboxesTotalCount: 0,
    state: 'idle'
}


export const useInboxStore = create<InboxStoreType>()((set, get) => ({
    ...initialState,
    async pin(inboxId) {
        const request = () => api.post(`${baseUrl}/${inboxId}/pin`);

        const response = await SharedHelpers.handleRequest<IDictInbox>(request, set);

        if (!response) return

        const { inboxes } = get();

        if (inboxes[inboxId]) {
            set(produce((state: InboxStoreType) => {
                state.inboxes[inboxId].isPinned = !inboxes[inboxId].isPinned
            }));
        }
    },
    async receivePinned() {
        const request = () => api.get(baseUrl + '/pinned');

        const response = await SharedHelpers.handleRequest<IInboxesResponse>(request, set)

        if (!response) return

        set(produce((state) => {
            Object.assign(state.inboxes, response.inboxes, state.inboxes)
        }));

    },
    async receiveByOffset(limit, offset) {
        const request = () => api.get(`${baseUrl}?limit=${limit}&offset=${offset}`);

        const response = await SharedHelpers.handleRequest<IInboxesResponse>(request, set)

        if (!response) return

        set(produce((state: InboxStoreType) => {
            Object.assign(state.inboxes, response.inboxes, state.inboxes)
            state.inboxesTotalCount = response.count
        }));
    },
    async receiveByChatId(chatId) {
        const request = () => api(baseUrl + `/bychat/?chatId=${chatId}`)

        const response = await SharedHelpers.handleRequest<IDictInbox>(request, set)

        if (!response) return

        set(produce((state: InboxStoreType) => {
            Object.assign(state.inboxes, response, state.inboxes)
        }));
    },
    async receiveBySearchTerm(searchTerm) {
        const request = () => api.get(`content/search/inbox/?message=${searchTerm}`);

        const response = await SharedHelpers.handleRequest<IDictInbox>(request, set);

        if (!response) return

        set({ matchedInboxes: response });
    },
    updateMsgId(inboxId, msgId) {
        set(produce((state: InboxStoreType) => {
            state.inboxes[inboxId].messageId = msgId
        }));
    },
    addInbox(inbox) {
        set(produce((state: InboxStoreType) => {
            state.inboxes[inbox.id] = inbox
        }));
    },
    removeInbox(inboxId) {
        const { removeChat } = useChatStore.getState()
        const inbox = get().inboxes[inboxId]

        set(produce((state: InboxStoreType) => {
            delete state.inboxes[inboxId]
        }));

        removeChat(inbox.chatId)
    },
}))

