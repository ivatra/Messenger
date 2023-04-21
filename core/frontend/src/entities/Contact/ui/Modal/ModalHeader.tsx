import React from 'react';
import { Group, Text, ModalCloseButtonProps, Modal } from '@mantine/core';

const closeButtonProps: ModalCloseButtonProps = {
    mt: "0.1rem",
    size: 'md',
    mr: "0.1rem",
};

const ModalHeader: React.FC = () => {
    return (
        <Group position="apart">
            <Text size='lg'>User Info</Text>
            <Modal.CloseButton {...closeButtonProps} />
        </Group>
    );
};

export default ModalHeader;