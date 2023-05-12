import { useState } from "react";
import { ActionIcon, Group } from "@mantine/core";
import { UpdateProfileParams } from "../types/Store";
import { EditFileInput } from "../../../shared/ui/Components/EditFileInput";
import { IProfile } from "..";
import { IEditInputs } from "../model/EditInputProps";
import { EditTextInput } from "./EditTextInput";
import { wrapInitialIcon, titleCaseWord, getPlaceholder } from "../helpers/propsHelper";

interface IEditInputProps {
    onSubmit: ({ field, value }: UpdateProfileParams) => void
    outcomeIcon?: JSX.Element
    profile: IProfile
    props: IEditInputs
}

export const BaseEditInput: React.FC<IEditInputProps> = ({
    onSubmit,
    outcomeIcon,
    profile,
    props
}) => {
    const wrapedInitialIcon = wrapInitialIcon(props.SubmitInitialIcon)

    const [value, setValue] = useState<string | File>(''); 

    const submitUpdate = () => {
        if (value) onSubmit({ field: props.field, value: value })
        setValue('')
    }

    const actionIconProps = {
        pt: "lg",
        onClick: submitUpdate
    }

    const label = titleCaseWord(props.field)
    const placeholder = getPlaceholder(props, profile)

    
    const Input = (
        props.type === 'file'
            ? <EditFileInput
                {...props}
                label={label}
                placeholder={placeholder}
                setValue={setValue}
                value={value as File} />
            : <EditTextInput {...props}
                label={label}
                placeholder={placeholder}
                type={props.type}
                setValue={setValue}
                value={value as string}
            />
    )

    return (
        <Group noWrap align="center" spacing="xs">
            {Input}
            <ActionIcon {...actionIconProps}>
                {outcomeIcon || wrapedInitialIcon}
            </ActionIcon>
        </Group>
    );
}
