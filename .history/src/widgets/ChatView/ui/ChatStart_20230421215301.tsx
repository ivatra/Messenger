import { Button, Group, Stack, Text } from "@mantine/core"

import { IconMessageCircle2 } from "@tabler/icons-react"
import { UnderlinedTextButton } from "./UnderlinedTextButton"


// TODO: Create group chat
export const ChatStart = () => {
    return (
        <Stack pos='relative' top='40%' align="center" c='dark.2' spacing={'0px'}>
            <IconMessageCircle2  size='5rem' />
            <Text size='md' mt={'xs'}>Select a chat </Text>
            <Group c='inherit' spacing='4px'>
                <Text size='md'>or</Text>
                <UnderlinedTextButton
                    color='#69aaca'
                    size="md"
                    onClick={() => { }}>
                    create a new one
                </UnderlinedTextButton>
            </Group>
        </Stack>
    )
}