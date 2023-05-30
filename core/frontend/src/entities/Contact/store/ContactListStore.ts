import { create } from 'zustand';
import produce from "immer";
import { IReceiveContactsResponse } from '../types/ContactApiResponse';


import { api } from '../../../app';
import { SharedHelpers } from '../../../shared';
import { IContactListStore, IContactListVariables } from '../types/ContactListStoreType';

const baseUrl = 'content/pages/contacts';

export const initialState: IContactListVariables = {
    contacts: [],
    searchedContacts: [],

    state: 'idle',

    contactsTotalCount: null,
    searchTotalCount: null
};


export const useContactListStore = create<IContactListStore>((set, get) => ({
    ...initialState,
    receiveByOffset: async (limit, offset) => {
        const request = () => api.get(`${baseUrl}/?limit=${limit}&offset=${offset}`);

        const response = await SharedHelpers.handleRequest<IReceiveContactsResponse>(request, set);

        if (!response) return;

        set(produce((state: IContactListStore) => {
            Object.assign(state.contacts, response.data, state.contacts)
            state.contactsTotalCount = response.count
        }));

    },

    receiveBySearchTerm: async (limit, offset, searchTerm) => {
        const request = () => api.get(`content/search/contacts/?message=${searchTerm}&limit=${limit}&offset=${offset}`);

        const response = await SharedHelpers.handleRequest<IReceiveContactsResponse>(request, set);

        if (!response) return;

        set(produce((state: IContactListStore) => {
            Object.assign(state.searchedContacts, response.data, state.searchedContacts)
            state.searchTotalCount = response.count
        }));
    },

    addContact: (contact) => {
        set(produce((state: IContactListStore) => {
            state.contacts[contact.id] = contact
        }));
    },
    updateContactStatus: (contactId, status) => {
        set(produce((state: IContactListStore) => {
            state.contacts[contactId].status = status
        }));
    },
    removeContact: (contactId) => {
        set(produce((state: IContactListStore) => {
            delete state.contacts[contactId]
        }));
    },
}));
