import { IDictContact, IContact, IContactStatus, IDictContactIdByUserId } from "./ContactModel";

import { SharedTypes } from "../../../shared";


export type IContactListStore = IContactListActions & IContactListVariables


export type ContactsType = {
    byId: IDictContact,
    idByUserId: IDictContactIdByUserId
}

export interface IContactListVariables extends SharedTypes.IStoreFeedback {
    contacts: ContactsType;

    contactsTotalCount: number | null;
}

export interface IContactListActions {
    receiveByOffset: (limit: number, offset: number) => void;
    receiveByUserId: (userId: string) => void

    addOrUpdateContact: (contact: IContact) => void;
    removeContact: (contactId: number) => void;
    updateContactStatus: (contactId: number, status: IContactStatus) => void
}