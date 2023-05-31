import React, { useEffect, useState } from "react"

import { IContact } from "../types/ContactModel"
import { useContactListStore } from "../store/ContactListStore"
import { ContactsType } from "../types/ContactListStoreType"
import { CenterLoader } from "../../../shared/ui"

interface IProps {
    children: React.ComponentType<{ contact: IContact | null }>
    contacts: ContactsType
    userId: string
}

// subcribe on contact changes
// load contact if he didnt exist
export const ContactWrapper: React.FC<IProps> = ({ children, userId, contacts }) => {
    const [contact, setContact] = useState<IContact | null>(null)

    const { receiveByUserId } = useContactListStore.getState()

    useEffect(() => {
        const contactId = contacts.idByUserId[userId]

        if (contactId === null) {
            return
        } else if (contactId === undefined) {
            const contact = contacts.byId[contactId]
            setContact(contact)
        } else {
            receiveByUserId(userId)
        }

    }, [contacts.idByUserId[userId], userId])

    if (!contact) {
        return <CenterLoader />
    } else {
        const ChildrenComponent = children;
        return <ChildrenComponent contact={contact} />
    }


}