import { create } from 'zustand';

import { IContactInteractions, IContactListStore } from '../types/Store';
import { IReceiveContactsResponse } from '../types/ApiResponse';

import { sortByIsContact } from '../helpers/sortSearchedContacts';
import { updateContactList } from '../helpers/mutateContactList';

import { api } from '../../../app';
import { SharedTypes, SharedHelpers } from '../../../shared';

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

export type StoreType = IContactListStore & SharedTypes.IStoreFeedback;

export const useContactListStore = create<StoreType>((set, get) => ({
    ...initialState,
    receiveContacts: async (limit) => { // Can be a bug with duplicating data(User adds a new contact, and the same contact can be received from API , Can be solved in request to database (ranking by date))
        const { contacts } = get();

        const offset = contacts.length

        const request = () => api.get(`${baseUrl}/?limit=${limit}&offset=${contacts.length}`); 

        const response = await SharedHelpers.handleRequest<IReceiveContactsResponse>(request, set);

        if (!response || get().isError) return;

        const unionContacts = [...contacts, ...response.data]

        set(({
            contacts: unionContacts,
            contactsHasMore: offset + limit < response.count
        }));


    },

    searchContacts: async (limit) => {
        const { searchedContacts, searchTerm } = get();

        const offset = searchedContacts.length

        const request = () => api.get(`content/search/contacts/?message=${searchTerm}&limit=${limit}&offset=${offset}`);

        const response = await SharedHelpers.handleRequest<IReceiveContactsResponse>(request, set);
        
        if (!response) return;

    const sortedContacts = sortByIsContact([...searchedContacts,...response.data])
    
        set({
            searchedContacts: sortedContacts,
            searchHasMore: offset + limit < response.count
        });

    },

    updateVisibleContacts: (contactsList) => {
        const { filter, setVisibleContacts } = get()
        const value = contactsList.filter((contact) => contact.name === 'Brandy')

        if (filter !== 'all') {
            const filteredContacts = contactsList.filter((contact) => contact.status === filter)
            setVisibleContacts(filteredContacts)
        } else {
            setVisibleContacts(contactsList)
        }

    },

    pushContact: (contact) => {
        const { contacts,searchedContacts,searchTerm} = get()
        if(contacts.includes(contact)) return
        
        set({contacts: [...contacts, contact]})

        if(searchTerm){
            const updatedSearched = updateContactList(searchedContacts, contact.id, 'outgoing')
            set({ searchedContacts: updatedSearched })
        }
    },

    updateContactStatus: (contactId, status) => {
        const { contacts, searchedContacts, searchTerm } = get()

        var newContacts

        if (searchTerm) {
            newContacts = updateContactList(searchedContacts, contactId, status)
            set({ searchedContacts: newContacts })
        } else {
            newContacts = updateContactList(contacts, contactId, status)
            set({ contacts: newContacts });
        }
    },
    removeContact: (contactId) => {
        const { contacts, searchTerm, searchedContacts } = get()


        const filteredContacts = contacts.filter((contact) => contact.id !== contactId)
        set({ contacts: filteredContacts })

        if (searchTerm) {
            const updatedSearched = updateContactList(searchedContacts, contactId, null)
            set({ searchedContacts: updatedSearched })
        }
    },
    setSearchTerm: (searchTerm) => set({ searchTerm }),

    resetSearch: () => set({ searchedContacts: [] }),

    setVisibleContacts: (visibleContacts) => set({ visibleContacts }),

    setFilter: (filter) => set({ filter }),
}));
