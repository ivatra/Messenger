import { useNavigate } from "react-router-dom"

import { Stack, Modal, Group, Text, TextProps } from "@mantine/core"
import { IconExclamationCircle } from "@tabler/icons-react"

import { HoverableText } from "../../../shared"
import { useUserStore } from "../../../entities"

export const FailedContent = () => {
    const isAuth = useUserStore(state => state.isAuth)
    const navigate = useNavigate()

    const handleRedirectToHome = () => {
        if (isAuth) navigate('/activate')
        else navigate('/auth')
    }

    return (
        <Stack>
            <Modal.Title>
                <Group>
                    <IconExclamationCircle size={24} color='red' />
                    <Text>Something has gone wrong</Text>
                </Group>
            </Modal.Title>
            <Stack>
                <Text>
                    Go back to the
                    <HoverableText onClick={handleRedirectToHome}>home page</HoverableText>
                    and request a new link
                </Text>
            </Stack>
        </Stack>
    )
}