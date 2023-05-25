import { Button, ButtonProps, Text } from "@mantine/core"
import { IconMessagePlus } from "@tabler/icons-react"
import { useChatStore } from "../../../../entities"



// on hover show name
export const GroupChatButton = () => {
    const openGroupChatModal = useChatStore.getState().setGroupChatCreationOpened

    const onButtonClick = () => {
        openGroupChatModal(true)
    }

    const buttonProps:ButtonProps = {
        size:'sm',
        bg:'dark.4',
        p:'xs',
        radius:'md',
        c:'blue',
    }

    return (
        <Button {...buttonProps} onClick={() => onButtonClick()}>
            <IconMessagePlus style={{ marginRight: '5px' }} />
        </Button>
    )

}