import { NativeSelect } from "@mantine/core";
import { useState } from "react";
import { useContactListStore } from "../../../../entities";
import { useDidUpdate } from "@mantine/hooks";
import { IContactInteractions } from "../../../../entities/Contact/types/Store";



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
        setVisibleContacts,
        filterContacts,
        searchTerm,
        contacts,
        searchedContacts 
    } = useContactListStore()

    const handleFilter = (value: string) => {
        setFilter(value as IContactInteractions)
        if (value !== 'all') filterContacts()
        else {
            const actualContacts = searchTerm
                ? searchedContacts
                : contacts
            setVisibleContacts(actualContacts)
        }
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
