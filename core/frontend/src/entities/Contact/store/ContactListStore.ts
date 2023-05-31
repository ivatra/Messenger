import { create } from 'zustand';
import produce from "immer";

import { IReceiveContactsResponse } from '../types/ContactApiResponse';
import { IContactListStore, IContactListVariables } from '../types/ContactListStoreType';

import { IContact } from '../types/ContactModel';

import { api } from '../../../app';
import { SharedHelpers } from '../../../shared';

const baseUrl = 'content/pages/contacts';

export const initialState: IContactListVariables = {
    contacts: { byId: {}, idByUserId: {} },

    state: 'idle',

    contactsTotalCount: null,
};


export const useContactListStore = create<IContactListStore>((set, get) => ({
    ...initialState,
    receiveByOffset: async (limit, offset) => {
        const request = () => api.get(`${baseUrl}/?limit=${limit}&offset=${offset}`);

        const contacts = await SharedHelpers.handleRequest<IReceiveContactsResponse>(request, set);

        if (!contacts) return;

        const dictContacts = SharedHelpers.convertArrToDict(contacts.data)

        set(produce((state: IContactListStore) => {
            Object.assign(state.contacts, dictContacts, state.contacts)

            for (var con of contacts.data) {
                state.contacts.idByUserId[con.userId] = con.id
            }

            state.contactsTotalCount = contacts.count
        }));

    },
    async receiveByUserId(userId) {
        const request = () => api.get(`${baseUrl}/${userId}`)

        const contact = await SharedHelpers.handleRequest<IContact | null>(request, set)

        if (contact === undefined) return

        set(produce((state: IContactListStore) => {
            if (contact !== null) {
                state.contacts.byId[contact.id] = contact
                state.contacts.idByUserId[userId] = contact.id
            } else {
                state.contacts.idByUserId[userId] = null
            }
        }));
    },

    addOrUpdateContact: (contact) => {
        set(produce((state: IContactListStore) => {
            state.contacts.byId[contact.id] = contact
        }));
    },
    updateContactStatus: (contactId, status) => {
        set(produce((state: IContactListStore) => {
            if (state.contacts.byId[contactId]) {
                state.contacts.byId[contactId].status = status
            }
        }));
    },
    removeContact: (contactId) => {
        set(produce((state: IContactListStore) => {
            delete state.contacts.byId[contactId]
        }));
    },
}));
