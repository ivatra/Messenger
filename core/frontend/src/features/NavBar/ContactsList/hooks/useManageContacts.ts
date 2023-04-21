import { useDidUpdate } from "@mantine/hooks"
import { useContactListStore } from "../../../../entities"

export const useManageVisibleContacts = () => {
    const {
        filter,
        searchTerm,

        setVisibleContacts,

        contacts,
        searchedContacts,
        filterContacts,
    } = useContactListStore()

    useDidUpdate(() => { // Managing visible contacts
        if (filter !== 'all') {
            filterContacts()
            return
        }
        if (searchTerm === '') setVisibleContacts(contacts)
        else setVisibleContacts(searchedContacts)
    }, [contacts, searchedContacts])
}