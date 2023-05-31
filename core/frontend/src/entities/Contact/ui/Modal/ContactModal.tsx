import { Modal, ModalProps, Stack } from "@mantine/core";


import ModalHeader from "./ModalHeader";
import ModalFunctionality from "./ModalFunctionality";
import { ModalInformation } from "./ModalInformation";
import { useContactInteractionStore } from "../../store/ContactInteractionStore";


const modalProps: Omit<ModalProps, 'onClose' | 'opened'> = {
    shadow: 'xl',
    radius: 'md',
    size: 'sm',
    zIndex: 900,
    withCloseButton: false,
    closeOnClickOutside: true,
    padding: 0,
}



export const ContactModal: React.FC = () => {
    const { contactModalisOpened, closeContactModal, currentUserId } = useContactInteractionStore()

    if (!contactModalisOpened) return <></>

    return (
        <Modal opened={contactModalisOpened} onClose={closeContactModal} {...modalProps}>
            <Stack spacing={'md'} py='md'>
                <Stack px={'lg'} spacing={'md'}>
                    <ModalHeader />
                    <ModalInformation contact={currentContact} />
                </Stack>
                <ModalFunctionality contact={currentContact} />
            </Stack>
        </Modal>
    )
}
