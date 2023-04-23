import { Modal, ModalProps, Stack } from "@mantine/core";


import { IContact } from "../../types/Model";
import ModalHeader from "./ModalHeader";
import ModalFunctionality from "./ModalFunctionality";
import { ModalInformation } from "./ModalInformation";
import { useContactInteractionStore } from "../../store/ContactInteractionStore";
import { useDidUpdate } from "@mantine/hooks";
import { useEffect } from "react";


const modalProps:Omit<ModalProps,'onClose' | 'opened'> = {
    shadow: 'xl',
    radius: 'md',
    size:'sm',
    zIndex: 900,
    withCloseButton:false,
    closeOnClickOutside: true,
    padding:0,
}

const ContactModal: React.FC = () => {
    const {currentContact,contactModalisOpened,closeContactModal} = useContactInteractionStore()

    if(!contactModalisOpened || !currentContact) return <></>

    return (
        <Modal opened={contactModalisOpened} onClose={closeContactModal} {...modalProps}>
            <Stack spacing={'md'} py='md'>
                <Stack px={'lg'} spacing={'md'}>
                    <ModalHeader />
                    <ModalInformation contact={currentContact}/>
                </Stack>
                <ModalFunctionality contact={currentContact}/>
            </Stack>
        </Modal>
    )
}

export default ContactModal