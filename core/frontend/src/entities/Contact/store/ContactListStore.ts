import { create } from 'zustand';

import { IContactInteractions, IContactListStore } from '../types/Store';
import { IReceiveContactsResponse, ISearchContactsResponse } from '../types/ApiResponse';

import { api } from '../../../app';
import { IStoreFeedback, handleRequest } from '../../../shared';
import { removeDublicates } from '../helpers/removeDublicates';
import { ISearchedContact } from '../types/Model';
import { sortSearchedContacts } from '../helpers/sortSearchedContacts';

const baseUrl = 'content/pages/contacts';

export const initialState = {
    isLoading: false,
    isError: false,

    contacts: [],
    searchedContacts: [],
    visibleContacts: [],

    filter: 'all' as IContactInteractions,
    searchTerm: '',

    searchHasMore: true,
    contactsHasMore: true
};

export type StoreType = IContactListStore & IStoreFeedback;

export const useContactListStore = create<StoreType>((set, get) => ({
    ...initialState,
    receiveContacts: async (limit) => {
        const { contacts } = get();
        const offset = contacts.length

        const request = () => api.get(`${baseUrl}/?limit=${limit}&offset=${offset}`);

        const response = await handleRequest<IReceiveContactsResponse>(request, set);

        if (!response || get().isError) return;


        const newOffset = offset + limit

        set(({
            contacts: [...contacts, ...response.data],
            contactsHasMore:newOffset < response.count
        }));
    },
    searchContacts: async (limit) => {
        const { searchedContacts, searchTerm } = get();
        const offset = searchedContacts.length

        const request = () => api.get(`content/search/contacts/?message=${searchTerm}&limit=${limit}&offset=${offset}`);

        const response = await handleRequest<ISearchContactsResponse>(request, set);

        if (!response || get().isError) return;

        const filteredContacts = removeDublicates(response.data,searchedContacts) //Very bad search alhoritm

        const sortedContacts = sortSearchedContacts(filteredContacts)

        const newOffset = offset + limit;

        set({
            searchedContacts: sortedContacts,
            searchHasMore: newOffset < response.count
        });
    },
    filterContacts: () => {
        const {
            searchTerm,
            filter,
            searchedContacts,
            contacts,
            setVisibleContacts
        } = get();

        if (filter === "all") new Error('Contact filter is all but it filter function has called'); // Something went wrong

        const filteredContacts = searchTerm
            ? searchedContacts.filter((contact) => contact.status === filter)
            : contacts.filter((contact) => contact.status === filter);

        setVisibleContacts(filteredContacts);
    },
    pushContact: (contact) => {
        set((state) => ({ contacts: [...state.contacts, contact] }))
    },
    updateContactStatus: (contactId, status) => {
        const {contacts} = get()

        const updatedContacts = contacts.map((contact) =>
            contact.id === contactId ? { ...contact, status } : contact
        );

        set({ contacts: updatedContacts });
    },
    removeContact: (contactId) => {
        const { contacts } = get()

        const filteredContacts = contacts.filter((contact) => contact.id !== contactId)

        if (filteredContacts.length === contacts.length) return // This contact did not exist

        set({ contacts: filteredContacts })
    },
    setSearchTerm: (searchTerm) => set({ searchTerm }),

    resetSearch: () => set({ searchedContacts: [] }),

    setVisibleContacts: (visibleContacts) => set({ visibleContacts }),

    setFilter: (filter) => set({ filter }),
}));
