import { IContact, IContactStatus } from "../types/Model";


export function updateContactList(list: IContact[], contactId: string, status: IContactStatus): IContact[] {
    const correspondingContact = [...list].find((contact) => contact.id === contactId)
    if (correspondingContact) {
        correspondingContact.status = status
    }
    return list
}
