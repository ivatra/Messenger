import { Group, Stack, Text } from "@mantine/core";
import { TablerIcon } from "../../../../../shared";

interface ITabProps {
    content: string
    label: string
    Icon: TablerIcon
}

export const TextTab: React.FC<ITabProps> = ({ content, label, Icon }) => {
    return (
        <Group spacing={'xl'}>
            <Icon/>
            <Stack spacing={0}>
                <Text>{content}</Text>
                <Text color='dark.2' size={'sm'}>{label}</Text>
            </Stack>
        </Group>
    );
}
