

import { useContactListStore } from "../../../../entities";
import { SharedUi } from "../../../../shared";


interface IHeaderProps {
    limit: number
}

export const ContactsSearchBar: React.FC<IHeaderProps> = ({ limit }) => {
    const {
        searchTerm,

        resetSearch,
        setSearchTerm,
        setVisibleContacts,

        contacts,

        searchContacts } = useContactListStore()

    const handleSearch = (searchTerm: string) => {
        resetSearch()
        setSearchTerm(searchTerm)

        if (searchTerm) searchContacts(limit)
        else setVisibleContacts(contacts)
    }
    return (

        <SharedUi.Search
            value={searchTerm}
            setValue={handleSearch}
            placeholder="Search for contacts..." />

    );
};