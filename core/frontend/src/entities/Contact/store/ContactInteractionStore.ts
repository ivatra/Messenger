import { create } from 'zustand';

import { useContactListStore } from '..';
import { IContact } from '../types/Model';
import { IContactInteractionsStore } from '../types/Store';

import { api } from '../../../app';
import { SharedTypes, SharedHelpers } from '../../../shared';

const baseUrl = 'content/pages/contacts';

export type StoreType = IContactInteractionsStore & SharedTypes.IStoreFeedback;

const initialState = {
    isLoading: false,
    isError: false,
    receivedContact: undefined,

    contactModalisOpened: false,
    currentContact: undefined
}

export const useContactInteractionStore = create<StoreType>((set, get) => ({
    ...initialState,
    addContact: async (contactId) => {
        const { pushContact } = useContactListStore.getState();
        const { currentContact } = get()

        const request = () => api.post(`${baseUrl}/${contactId}/add`)
        const response = await SharedHelpers.handleRequest<IContact>(request, set);

        if (!response || get().isError || !currentContact) return;

        const updatedContact = { ...currentContact, status: 'outgoing' } as IContact

        set({ currentContact: updatedContact })
        pushContact(updatedContact)
        
    },
    acceptContact: async (contactId) => {
        const { updateContactStatus } = useContactListStore.getState()
        const { currentContact } = get()

        const request = () => api.put(`${baseUrl}/${contactId}/update?status=accepted`);
        const response = await SharedHelpers.handleRequest<IContact>(request, set);

        if (!response || get().isError || !currentContact) return;

        const updatedContact = { ...currentContact, status: 'accepted' } as IContact

        set({ currentContact: updatedContact })
        updateContactStatus(contactId, 'accepted')
    },
    removeContact: async (contactId) => {
        const { removeContact } = useContactListStore.getState()
        const { currentContact } = get()

        const request = () => api.delete(`${baseUrl}/${contactId}/remove`);
        const response = await SharedHelpers.handleRequest<IContact>(request, set);

        if (!response || get().isError || !currentContact) return;

        
        const updatedContact = {...currentContact,status:null} as IContact

        set({ currentContact: updatedContact })
        removeContact(contactId)
    },
    receiveContactById: async (id: string) => {
        const response = await SharedHelpers.handleRequest<IContact>(() => api.get(`${baseUrl}/${id}`), set);

        if (!response || get().isError) return;

        return response
    },
    openContactModal: (contact) => {
        set({ currentContact: contact, contactModalisOpened: true })
    },
    closeContactModal: () => {
        set({ currentContact: undefined, contactModalisOpened: false })
    }
}));
