import { Group } from "@mantine/core";

import { FilterSelector } from "./FilterSelector";
import { useContactListStore } from "../../../../entities";
import { Search } from "../../../../shared";

interface IHeaderProps {
    limit:number
}

export const ContactsListHeader:React.FC<IHeaderProps> = ({limit}) => {
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
        <Group noWrap spacing="0px" mb={0}>
            <Search value={searchTerm} setValue={handleSearch} placeHolder="Write something..." />
            <FilterSelector />
        </Group>
    )
};