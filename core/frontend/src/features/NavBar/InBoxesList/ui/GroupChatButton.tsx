import { Button, Text } from "@mantine/core"
import { IconMessagePlus } from "@tabler/icons-react"


export const GroupChatButton = () => {
    return (
        <Button size="sm" bg={'dark.4'} p={'xs'} radius={'md'}>
            <IconMessagePlus style={{ marginRight: '5px' }} />
            <Text size = 'xs'>New chat</Text>
        </Button>
    )

}