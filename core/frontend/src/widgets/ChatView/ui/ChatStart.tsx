import { Group, Stack, Text } from "@mantine/core"

import { IconMessageCircle2 } from "@tabler/icons-react"

import { SharedUi } from "../../../shared"
import { useChatStore } from "../../../entities"


export const ChatStart = () => {

    const openGroupChatModal = useChatStore.getState().setGroupChatCreationOpened

    const onButtonClick = () => {
        openGroupChatModal(true)
    }

    
    return (
        (<Stack pos='relative' top='40%' align="center" c='dark.2' spacing={'0px'}>
            <IconMessageCircle2  size='5rem' />
            <Text size='md' mt={'xs'}>Select a chat </Text>
            <Group c='inherit' spacing='4px'>
                <Text size='md'>or</Text>
                <SharedUi.UnderlinedTextButton
                    color='#69aaca'
                    size="md"
                    onClick={() => onButtonClick()}>
                    create a new one
                </SharedUi.UnderlinedTextButton>
            </Group>
        </Stack>)
    );
}