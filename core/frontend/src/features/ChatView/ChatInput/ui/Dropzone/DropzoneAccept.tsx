import { Group, Text } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { IconPhotoDown } from "@tabler/icons-react";

export const DropzoneAccept = () => {
    return (
        <Dropzone.Accept>
            <Group spacing='xs'>
                <IconPhotoDown size='3rem' />
                <Text size='2rem'>Drop image here</Text>
            </Group>
        </Dropzone.Accept>);
};
