import { IContact, IContactStatus } from "../types/Model";




export function updateContactList(list: IContact[], contactId: string, status: IContactStatus): IContact[] {
    return list.map((contact) =>
        contact.id === contactId ? { ...contact, status:status } : contact
    );
}