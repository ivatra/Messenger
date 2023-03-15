import { TextInput, Burger, Group, TextInputProps } from "@mantine/core";
import { useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import { api } from "../../../../shared";



const textInputProps: TextInputProps = {
    w: '100%',
    placeholder: "Search...",
    icon: < IconSearch size={20} />,
    sx:{alignSelf:'flex-start'}
}
export const Search = () => {
    return (
        <TextInput {...textInputProps}  />
    );
};

// @TODO: FIX SEARCH