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
    placeholder:string
    setValue: (value: string) => void
}

export const Search: React.FC<ISearch> = ({ value, setValue,placeholder: placeHolder }) => {
    return (
        <TextInput
            styles={{input:{
                ":placeholder-shown":{
                    textOverflow: 'ellipsis',
                }
            }}}
            {...textInputProps}
            value={value}
            placeholder={placeHolder}
            onChange={(event) => setValue(event.currentTarget.value)}
        />
    );
};