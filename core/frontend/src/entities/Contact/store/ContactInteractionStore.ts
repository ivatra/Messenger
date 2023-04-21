import { create } from 'zustand';

import { useContactListStore } from '..';
import { IContact } from '../types/Model';
import { IContactInteractionsStore } from '../types/Store';

import { api } from '../../../app';
import { IStoreFeedback, handleRequest } from '../../../shared';

const baseUrl = 'content/pages/contacts';

export type StoreType = IContactInteractionsStore & IStoreFeedback;

const initialState = {
    isLoading: false,
    isError: false,
    receivedContact:undefined,

    contactModalisOpened:false,
    currentContact:undefined
}

export const useContactInteractionStore = create<StoreType>((set, get) => ({
    ...initialState,
    addContact: async (contactId) => {
        const { pushContact } = useContactListStore.getState();
        const { currentContact } = get()

        const request = () => api.post(`${baseUrl}/${contactId}/add`)
        const response = await handleRequest<IContact>(request, set);

        if (!response || get().isError || !currentContact) return;
        
        pushContact(response)

        set({currentContact:{ ...currentContact, status: 'outgoing' }})
    },
    acceptContact: async (contactId) => {
        const {updateContactStatus} = useContactListStore.getState()
        const { currentContact } = get()

        const request = () => api.put(`${baseUrl}/${contactId}/update?status=accepted`);
        const response = await handleRequest<IContact>(request, set);

        if (!response || get().isError || !currentContact) return;

        updateContactStatus(response.id,response.status)

        set({ currentContact: { ...currentContact, status: 'accepted' } })
    },
    removeContact: async (contactId) => {
        const { removeContact } = useContactListStore.getState()
        const {currentContact} = get()

        const request = () => api.delete(`${baseUrl}/${contactId}/remove`);

        const response = await handleRequest<IContact>(request, set);

        if (!response || get().isError || !currentContact) return;

        removeContact(contactId)

        set({ currentContact: { ...currentContact, status: null } })
    },
    receiveContactById: async (id: string) => {
        const response = await handleRequest<IContact>(() => api.get(`${baseUrl}/${id}`), set);

        if (!response || get().isError) return;

       set({receivedContact:response})
    },
    openContactModal:(contact) =>{
        set({currentContact:contact,contactModalisOpened:true})
    },
    closeContactModal:()=>{
        set({currentContact:undefined,contactModalisOpened:false})
    }
}));
