import { create } from 'zustand';

import { useContactListStore } from '..';
import { IContact } from '../types/ContactModel';
import { IContactInteractionVariables } from '../types/ContactInteractionStoreType';

import { api } from '../../../app';
import { SharedHelpers } from '../../../shared';
import { IContactListStore } from '../types/ContactListStoreType';

const baseUrl = 'content/pages/contacts';

const initialState:IContactInteractionVariables = {
    contactModalisOpened:false,
    state:'idle'
}

export const useContactInteractionStore = create<IContactListStore>((set, get) => ({
    ...initialState,
    addContact: async (userId) => {
        const request = () => api.post(`${baseUrl}/${userId}/add`)
        const response = await SharedHelpers.handleRequest<IContact>(request, set);

        if (!response) return;

        const addContact = useContactListStore.getState().addContact

        const newContact = {userId,status:''} as IContact
        addContact()
        
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
    receiveContactByUserId: async (id: string) => {
        const response = await SharedHelpers.handleRequest<IContact>(() => api.get(`${baseUrl}/${id}`), set);

        if (!response || get().isError) return;

        return response
    },
    openModalWithUser: (contact) => {
        set({ currentContact: contact, contactModalisOpened: true })
    },
    closeContactModal: () => {
        set({ currentContact: undefined, contactModalisOpened: false })
    }
}));
