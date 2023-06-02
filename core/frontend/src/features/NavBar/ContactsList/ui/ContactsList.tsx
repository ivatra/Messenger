import { useMemo, useState } from "react";

import useContactsLoading from "../hooks/useContactsLoading";
import { useManageVisibleContacts } from "../hooks/useManageContacts";
import { useScrollOnTabSwitch } from "../hooks/useScrollOnTabSwitch";

import { IContact, useContactListStore, ContactTab } from "../../../../entities";
import { SharedUi } from "../../../../shared";
import { CenterLoader } from "../../../../shared/ui";

interface IContactsListProps {
    onContactTabClick: (contact: IContact) => void
    limit: number
    contacts: IContact[]
}

export const ContactsList: React.FC<IContactsListProps> = ({ onContactTabClick, contacts, limit }) => {
    const [scrollPosition, onScrollPositionChange] = useState({ x: 0, y: 0 });
    const { isLoading, searchTerm, filter } = useContactListStore()

    const scrollViewPort = useScrollOnTabSwitch()

    useContactsLoading(scrollViewPort, scrollPosition.y, limit)
    useManageVisibleContacts()

    const VisibleContacts = useMemo(() => {
        const contactsComponent = contacts.map((contact) => <ContactTab
            key={contact.id}
            contact={contact}
            onTabClick={() => onContactTabClick(contact)} />)

        return (
            <SharedUi.ScrollableList
                EntitiesList={contactsComponent}
                Skeleton={SharedUi.SideBarItemSkeleton}
                scrollRef={scrollViewPort}
                isLoading={isLoading}
                onScrollPosChange={onScrollPositionChange}
            />
        );
    }, [contacts])

    if (!contacts.length && !isLoading) {
        return <SharedUi.NothingFoundView subject={searchTerm || filter} />
    } else if (isLoading && !contacts.length) {
        return <CenterLoader />
    } else {
        return VisibleContacts
    }

}