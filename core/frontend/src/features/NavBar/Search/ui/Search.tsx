import { TextInput, Burger, Group, TextInputProps } from "@mantine/core";
import { useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import { api } from "../../../../app";


const textInputProps: TextInputProps = {
    placeholder: "Search...",
    size:'xs',
    icon: <IconSearch size={15} />,
}
export const Search = () => {
    return (
        <TextInput {...textInputProps} />
    );
};

// @TODO: FIX SEARCH