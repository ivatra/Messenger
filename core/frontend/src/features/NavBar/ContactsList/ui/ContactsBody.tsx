import { useMemo } from "react"
import { useContactListStore } from "../../../../entities"
import { NothingFoundView, ScrollableList, SideBarItemSkeleton } from "../../../../shared"
import { ContactTab } from "../../../../entities/Contact/ui/ContactTab"

interface IContactsBodyProps {
    onScrollPositionChange: any
    scrollRef: React.RefObject<HTMLDivElement>
}

export const ContactsBody: React.FC<IContactsBodyProps> = ({ onScrollPositionChange,scrollRef }) => {
    const { visibleContacts, isLoading, searchTerm, filter } = useContactListStore()

    const contactsComponent = useMemo(() =>{
        return visibleContacts.map((contact) => <ContactTab key={contact.id} contact={contact} />)
    }, [visibleContacts])

    const VisibleContacts = useMemo(() =>(
        <ScrollableList
            EntitiesList={contactsComponent}
            Skeleton={SideBarItemSkeleton}
            scrollRef={scrollRef}
            isLoading={isLoading}
            onScrollPosChange={onScrollPositionChange}
        />
    ),[contactsComponent])

    const ContactsBody = (
        !visibleContacts.length && !isLoading
            ? <NothingFoundView searchValue={searchTerm || filter} />
            : VisibleContacts
    )
    return ContactsBody
}