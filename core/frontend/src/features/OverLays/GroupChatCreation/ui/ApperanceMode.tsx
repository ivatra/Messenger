import { Group, Stack, TextInput } from "@mantine/core";

import { GroupChatImagePreview } from "./GroupChatImagePreview";

interface IProps {
    name: string;
    setName: (name: string) => void;
    file: File | null;
    setFile: (file: File | null) => void;

    isError: boolean
    setError: (value: boolean) => void
}

const AppearanceMode = ({ name, setName, file, setFile, setError, isError }: IProps) => {

    const onNameChange = (event: any) => {
        setError(false)
        setName(event.currentTarget.value)
    }

    return (
        <Group h='8rem'>
            <GroupChatImagePreview file={file} setFile={setFile} />
            <Stack>
                <TextInput
                    error={isError}
                    label="Group name"
                    value={name}
                    onChange={onNameChange}
                />
            </Stack>
        </Group>
    );
};

export default AppearanceMode;
