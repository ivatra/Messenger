import { Button, Text } from "@mantine/core"
import { IconMessagePlus } from "@tabler/icons-react"



// on hover show name
export const GroupChatButton = () => {
    return (
        <Button size="sm" bg={'dark.4'} p={'xs'} radius={'md'} c ='blue'>
            <IconMessagePlus style={{ marginRight: '5px' }} />
        </Button>
    )

}