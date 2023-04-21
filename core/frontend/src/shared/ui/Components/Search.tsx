import { TextInput, TextInputProps } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

const textInputProps: TextInputProps = {
    size: 'sm',
    p: 'xs',
    w: '100%',
    icon: <IconSearch size='1rem' spacing={0} />,
}

interface ISearch {
    value: string
    placeHolder:string
    setValue: (value: string) => void
}

export const Search: React.FC<ISearch> = ({ value, setValue,placeHolder }) => {
    return (
        <TextInput
            {...textInputProps}
            value={value}
            placeholder={placeHolder}
            onChange={(event) => setValue(event.currentTarget.value)}
        />
    );
};