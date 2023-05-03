import { NativeSelect } from "@mantine/core";
import { IContactInteractions, useContactListStore } from "../../../../entities";


interface IFilterData {
    value: IContactInteractions
    label: string
}

const filterData: IFilterData[] = [
    { value: 'all', label: "All" },
    { value: "pending", label: "Pending" },
    { value: "accepted", label: "Accepted" },
    { value: "outgoing", label: "Outgoing" }
];

export const FilterSelector: React.FC = () => {
    const {
        filter,
        setFilter,
        updateVisibleContacts,
        searchTerm,
        contacts,
        searchedContacts 
    } = useContactListStore()

    const handleFilter = (value: string) => {
        setFilter(value as IContactInteractions)

        const currentList = searchTerm
            ? searchedContacts
            : contacts
        
            console.log(currentList)
        updateVisibleContacts(currentList)
    }

    return (
        <NativeSelect
            w={'60%'}
            data={filterData}
            value={filter}
            onChange={(event) => handleFilter(event.currentTarget.value)}
        />
    );
}
