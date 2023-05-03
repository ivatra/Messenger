import { useDidUpdate } from "@mantine/hooks"
import { useContactListStore } from "../../../../entities"

export const useManageVisibleContacts = () => {
    const {
        searchTerm,

        contacts,
        searchedContacts,
        updateVisibleContacts
    } = useContactListStore()

    useDidUpdate(() => { 
        const currentList = searchTerm.length >= 1
            ? searchedContacts
            : contacts
        
        updateVisibleContacts(currentList)

    }, [contacts, searchedContacts])
}

