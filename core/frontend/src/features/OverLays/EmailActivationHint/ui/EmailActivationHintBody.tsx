import { Stack, Modal, Group, Text, TextProps } from "@mantine/core"

import { IconCircleCheck } from "@tabler/icons-react"

import { RefreshActivationGroup } from "./RefreshActivationGroup"

import { SharedUi } from "../../../../shared"


const baseButtonProps: TextProps = {
    color: 'blue.5',
    display: 'inline',
}

interface IProps {
    email: string
    logout: () => void
}

export const EmailActivationHintBody: React.FC<IProps> = ({ email, logout }) => {
    const emailText = <Text {...baseButtonProps}>{email}</Text>

    const logoutButton = (
        <SharedUi.HoverableText
            onClick={() => logout()}>
            logout
        </SharedUi.HoverableText>
    )

    return (
        <Stack spacing='lg'>
            <Modal.Title>
                <Group >
                    <IconCircleCheck size={24} color='green' />
                    <Text>Authorization passed successfully</Text>
                </Group>
            </Modal.Title>
            <Modal.Body>
                <Stack spacing='xs'>
                    <Text>
                        To continue, please follow the activation link sent to{' '}
                        {emailText} {' '}
                        and activate your account.
                    </Text>
                    <Text>Want to change an account? {logoutButton} </Text>
                    <RefreshActivationGroup />
                </Stack>
            </Modal.Body>
        </Stack>
    )
}