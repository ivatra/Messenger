import { create } from 'zustand';

import { useContactListStore } from '..';
import { IContact } from '../types/ContactModel';
import { IContactInteractionStore, IContactInteractionVariables } from '../types/ContactInteractionStoreType';

import { api } from '../../../app';
import { SharedHelpers } from '../../../shared';

const baseUrl = 'content/pages/contacts';

const initialState: IContactInteractionVariables = {
    contactModalisOpened: false,
    currentUserId:null,
    state: 'idle'
}

export const useContactInteractionStore = create<IContactInteractionStore>((set, get) => ({
    ...initialState,
    addContact: async (userId) => {
        const request = () => api.post(`${baseUrl}/${userId}/add`)
        const contact = await SharedHelpers.handleRequest<IContact>(request, set);

        if (!contact) return;

        const addContact = useContactListStore.getState().addOrUpdateContact

        addContact(contact)

    },
    acceptContact: async (contactId) => {
        const request = () => api.put(`${baseUrl}/${contactId}/update?status=accepted`);
        const contact = await SharedHelpers.handleRequest<IContact>(request, set);

        if (!contact) return;

        const { addOrUpdateContact } = useContactListStore.getState()


        addOrUpdateContact(contact)
    },
    removeContact: async (contactId) => {
        const request = () => api.delete(`${baseUrl}/${contactId}/remove`);
        const response = await SharedHelpers.handleRequest<IContact>(request, set);

        if (!response) return;

        const { removeContact } = useContactListStore.getState()

        removeContact(contactId)
    },
    openModalWithUser: (userId) => {
        set({ contactModalisOpened: true, currentUserId: userId })
    },
    closeContactModal: () => {
        set({ contactModalisOpened: false,currentUserId:null })
    }
}));
