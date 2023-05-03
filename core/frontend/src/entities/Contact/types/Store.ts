import { IContact, IContactStatus} from "./Model";


export type IContactInteractions = 'all' | 'accepted' | 'pending' | 'outgoing'

export interface IContactListStore {
    contacts: IContact[];
    searchedContacts: IContact[];
    visibleContacts: IContact[];

    filter: IContactInteractions;
    searchTerm: string;

    contactsHasMore: boolean;
    searchHasMore: boolean;

    receiveContacts: (limit:number) => void;
    searchContacts: (limit:number) => void;
    updateVisibleContacts:(list:IContact[] | IContact[]) => void

    pushContact: (contact: IContact) => void;
    updateContactStatus: (contactId: string, status: IContactStatus) => void
    removeContact: (contactId: string) => void;

    setVisibleContacts: (list: IContact[]) => void;
    setFilter: (filter:IContactInteractions) => void;
    setSearchTerm: (term: string) => void;
    resetSearch: () => void
}

export interface IContactInteractionsStore {
    addContact: (contactId:string) => void
    acceptContact: (contactId: string) => void
    removeContact: (contactId: string) => void
    receiveContactById: (id: string) => Promise<IContact | undefined>

    contactModalisOpened:boolean
    currentContact: IContact | undefined

    openContactModal:(contact:IContact) => void
    closeContactModal:() => void
}
