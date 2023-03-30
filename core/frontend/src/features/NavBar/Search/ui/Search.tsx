import { TextInput, TextInputProps } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

import { sections } from "../../../../widgets";


interface ISearchProps {
    area: sections
}

const textInputProps: TextInputProps = {
    placeholder: "Search...",
    size: 'sm',
    p: 'xs',
    w:'100%',
    icon: <IconSearch size='1rem' spacing={0} />,
}

export const Search: React.FC<ISearchProps> = ({ area }) => {
    return (
        <TextInput {...textInputProps} />
    );
};

// @TODO: FIX SEARCH