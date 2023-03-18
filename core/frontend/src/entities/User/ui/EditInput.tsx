import { useState } from "react";
import { TextInputProps, ActionIcon, Group, TextInput } from "@mantine/core";
import { iconBaseProps } from "../../../shared";
import { ProfileFields, UpdateProfileParams } from "../types/Store";

function wrapInitialIcon(Icon: React.ElementType) {
    return <Icon {...iconBaseProps} />
}

interface IEditInputProps {
    onSubmit: ({ field, value }: UpdateProfileParams) => void
    field: ProfileFields
    label: string
    outcomeIcon?:JSX.Element
    placeholder: string
    SubmitInitialIcon: React.ElementType
    PlaceholderIcon: React.ElementType
}

export const EditInput: React.FC<IEditInputProps> = ({
    onSubmit,
    field,
    placeholder,
    PlaceholderIcon,
    SubmitInitialIcon,
    label,
    outcomeIcon
}) => {
    const wrapedInitialIcon = wrapInitialIcon(SubmitInitialIcon)

    const [value, setValue] = useState<string>("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
    };

    const inputProps: TextInputProps = {
        w: "100%",
        value: value,
        label: label,
        placeholder: placeholder,
        icon: <PlaceholderIcon size={"1.3rem"} />,
        onChange: handleInputChange,
    }

    const actionIconProps = {
        pt: "lg",
        onClick: () => onSubmit({ field: field, value: value })
    }


    return (
        <Group noWrap align="center" spacing="xs">
            <TextInput {...inputProps} />
            <ActionIcon {...actionIconProps}>
                {outcomeIcon || wrapedInitialIcon}
            </ActionIcon>
        </Group>
    );
}
