import { IDictContact, IContact, IContactStatus } from "./ContactModel";

import { SharedTypes } from "../../../shared";



export type IContactListStore = IContactListActions  & IContactListVariables


export interface IContactListVariables extends SharedTypes.IStoreFeedback {
    contacts: IDictContact;
    searchedContacts: IDictContact;

    contactsTotalCount: number | null;
    searchTotalCount: number | null;
}

export interface IContactListActions {
    receiveByOffset: (limit: number, offset: number) => void;
    receiveBySearchTerm: (limit: number, offset: number,searchTerm:string) => void;

    addContact: (contact: IContact) => void;
    removeContact: (contactId: number) => void;
    updateContactStatus: (contactId: number, status: IContactStatus) => void
}