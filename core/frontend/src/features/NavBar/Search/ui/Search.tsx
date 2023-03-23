import { TextInput, Burger, Group, TextInputProps } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { sections } from "../../../../widgets/LeftBar/types/Sections";



interface ISearchProps{
    area:sections
}

const textInputProps: TextInputProps = {
    placeholder: "Search...",
    size:'xs',
    icon: <IconSearch size={15} />,
}

export const Search:React.FC<ISearchProps> = ({area}) => {
    return (
        <TextInput {...textInputProps} />
    );
};

// @TODO: FIX SEARCH