import { IconAlertTriangle } from "@tabler/icons-react";
import { Modal, Text, Stack, Group, Box } from "@mantine/core";

import { ResignButton } from "./ResignButton";

import { useProfileStore } from '../../../../entities';


const modalProps = {
    withCloseButton: false,
    onClose: () => { },
    centered: true,
    shadow: 'xl',
    radius: 'md',
    padding: 'xl',
    zIndex: 900
}


export const SessionExpiredModal: React.FC = (): JSX.Element => {
    const { isSessionExpired, setSessionExpired, logout } = useProfileStore()

    const reSign = () => {
        logout()
        setSessionExpired(false)
        window.location.href = '/auth'
    }

    return (
        <Modal
            opened={isSessionExpired}
            {...modalProps}
        >
            <Stack m={'xs'}>
                <Group noWrap spacing={'xl'} mr={'3rem'}>
                    <Box mb='0.5rem'>
                        <IconAlertTriangle size='3rem' color='#FFD43B' />
                    </Box>
                    <Stack spacing={'xs'}>
                        <Text size='lg'> Your session has expired</Text>
                        <Text>Please log in again to continue using the app.</Text>
                    </Stack>
                </Group>
                <ResignButton resignFunc={reSign} />
            </Stack>
        </Modal>
    );
}