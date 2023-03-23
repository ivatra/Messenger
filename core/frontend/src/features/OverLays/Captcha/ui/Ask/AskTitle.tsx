import { Group, Modal, Text } from "@mantine/core";

export const AskTitle: React.FC = () => (
    <Group position="apart">
        <Modal.Title>
            <Text size="xl">Who are you?</Text>
        </Modal.Title>
        <Modal.CloseButton size="md" />
    </Group>
);
