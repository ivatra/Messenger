import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { Modal, ModalProps } from "@mantine/core"

import { EmailActivationHintBody } from "./EmailActivationHintBody"

import { useUserStore } from "../../../../entities"
import { useInterval } from "@mantine/hooks"


export const EmailActivationHint: React.FC = () => {
    const [isOpened, setOpened] = useState<boolean>(true)
    const navigate = useNavigate()

    const { logout, profile,checkActivation,isActivated} = useUserStore()

    const handleLogout = () => {
        logout()
    }
    
    const interval = useInterval(() => {
        checkActivation()
    }, 5000)

    useEffect(() => {
        if (!isActivated) {
            interval.start()
        } else {
            interval.stop()
            navigate('/chat')
        }
        return () => interval.stop()
    }, [isActivated])

    const modalProps: ModalProps = {
        onClose: () => setOpened(false),
        opened: isOpened,
        size: 'md',
        centered: true,
        withCloseButton: false,
        closeOnClickOutside: false
    }

    return (
        <Modal {...modalProps}>
            <EmailActivationHintBody email={profile ? profile.email : ''} logout={handleLogout} />
        </Modal>
    )
}