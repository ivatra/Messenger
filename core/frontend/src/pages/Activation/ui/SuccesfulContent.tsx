import { useState } from "react"
import { useNavigate } from "react-router-dom"


import { Stack, Modal, Group, TextProps,Text } from "@mantine/core"
import { useDidUpdate } from "@mantine/hooks"
import { IconCircleCheck } from "@tabler/icons-react"

import { Counter } from "./Counter"

import { HoverableText } from "../../../shared"

export const SuccesfullContent = () => {
    const [isCounterFinished, setCounterFinished] = useState<boolean>(false)
    const navigate = useNavigate();

    const redirectToChat = () => {
        navigate('/chat')
    }

    useDidUpdate(() => {
        if (isCounterFinished) {
            redirectToChat()
        }
    }, [isCounterFinished])

    return (
        <Stack h='20%' >
            <Modal.Title>
                <Group >
                    <IconCircleCheck size={24} color='green' />
                    <Text>An account successfully activated</Text>
                </Group>
            </Modal.Title>
            <Stack>
                <Group>
                    <Text>Redirecting to chat page in </Text>
                    <Counter
                        interval={1000}
                        maxValue={5}
                        order='DESC'
                        setCounterFinished={() => setCounterFinished(true)} />
                </Group>
                <Text>If redirect didn't happen go by {' '}
                    <HoverableText  onClick={() => redirectToChat()}>
                        your own
                    </HoverableText>
                </Text>
            </Stack>
        </Stack>
    )
}
