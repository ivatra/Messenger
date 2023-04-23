import { useDidUpdate } from "@mantine/hooks"
import { useContactListStore } from "../../../../entities"

export const useManageVisibleContacts = () => {
    const {
        searchTerm,

        contacts,
        searchedContacts,
        updateVisibleContacts
    } = useContactListStore()

    useDidUpdate(() => { // Managing visible contacts
        const currentList = searchTerm
            ? searchedContacts
            : contacts
        
        updateVisibleContacts(currentList)

    }, [contacts, searchedContacts])
}

