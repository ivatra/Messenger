import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { Modal, ModalProps } from "@mantine/core"
import { useInterval } from "@mantine/hooks"

import { EmailActivationHintBody } from "./EmailActivationHintBody"

import { useProfileStore } from "../../../../entities"


export const EmailActivationHint: React.FC = () => {
    const [isOpened, setOpened] = useState<boolean>(true)
    const navigate = useNavigate()

    const { logout, profile,checkActivation,isActivated} = useProfileStore()

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