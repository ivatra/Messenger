import { ActionIcon, Group, MantineStyleSystemProps, Text } from "@mantine/core"
import { SharedConsts, SharedTypes } from "../../../shared"
import { IconArrowLeft } from "@tabler/icons-react"
import { useMediaQuery } from "@mantine/hooks"
import { useNavigate } from "react-router-dom"


interface IChatHeaderProps {
    chat: SharedTypes.IChat
    height: MantineStyleSystemProps['h']
}


export const ChatHeader: React.FC<IChatHeaderProps> = ({ chat,height }) => {
    const isDesktop = useMediaQuery(`(min-width: ${SharedConsts.DESKTOP_WIDTH})`);

    const navigate = useNavigate()

    const handleArrowClick = () => {
        navigate(`/chat`)
    }   

    const backToNavbarButton = (
        <ActionIcon size='2rem' onClick={handleArrowClick}>
            <IconArrowLeft size='2rem' />
        </ActionIcon>
    )
    return (
        <Group h={height} bg='red' >
            {!isDesktop && backToNavbarButton}
            <Text style={{ margin: '0', alignSelf: 'center' }}>hello world</Text>
        </Group >
    )

}