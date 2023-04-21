import { Group, Text } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { IconX } from "@tabler/icons-react";

export const DropzoneReject = () => {
    return (
        <Dropzone.Reject>
            <Group spacing='xs' c = 'red'>
                <IconX size='3rem' />
                <Text size='2rem'>File should be an image</Text>
            </Group>
        </Dropzone.Reject>
    );
};
