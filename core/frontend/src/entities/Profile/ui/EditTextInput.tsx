import { HTMLInputTypeAttribute, useState } from "react";
import { TextInputProps, TextInput } from "@mantine/core";

interface IEditInputProps {
    label: string
    type: HTMLInputTypeAttribute
    placeholder: string
    PlaceholderIcon: React.ElementType
    value:string
    setValue: (value: string) => void
}

export const EditTextInput: React.FC<IEditInputProps> = ({
    type,
    placeholder,
    PlaceholderIcon,
    label,
    value,
    setValue
}) => {

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
    };

    const inputProps:TextInputProps =  {
        w: "100%",
        value: value,
        label: label,
        type: type,
        placeholder: placeholder,
        icon: <PlaceholderIcon size={"1.3rem"} />,
        onChange: handleInputChange,
    }

    return <TextInput {...inputProps} />
}
