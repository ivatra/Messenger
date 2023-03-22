import { IconAlertTriangle } from "@tabler/icons-react";
import { Button, Modal, Text, Stack, Group, Box } from "@mantine/core";
import { useUserStore } from '../../../../entities';
import { useEffect } from "react";


const modalProps = {
    withCloseButton: false,
    onClose: () => { },
    centered: true,
    shadow: 'xl',
    radius: 'md',
    padding: 'xl',
    zIndex: 900
}

const SessionExpiredModal: React.FC = ():JSX.Element => {
    const { isSessionExpired, setSessionExpired, logout } = useUserStore()
    const reSign = () => {
        logout()
        setSessionExpired(false)
        window.location.href = '/auth'
    }

    return (
        <Modal
            opened={isSessionExpired}
            {...modalProps}>
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
                <Button
                    variant='outline'
                    sx={{ alignSelf: 'flex-end' }}
                    onClick={reSign}>
                    Log in
                </Button>
            </Stack>
        </Modal>
    );
}
export default SessionExpiredModal