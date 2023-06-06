import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

import { ActionIcon, Group, Stack, Text, Button } from "@mantine/core"
import { IconArrowLeft, IconChalkboard, IconPaperclip, IconSearch, IconUser } from "@tabler/icons-react"
import { useMediaQuery } from "@mantine/hooks"

import { generateBottomTitle } from "../helpers/fetchBottomTitle"
import { useChatStore, useContactInteractionStore } from "../../../entities"
import { SharedConsts, SharedHelpers, SharedTypes, SharedUi } from "../../../shared"


interface IChatHeaderProps {
    chat: SharedTypes.IChat
    height: string
}

export const ChatHeader: React.FC<IChatHeaderProps> = ({ chat, height }) => {
    const isDesktop = useMediaQuery(`(min-width: ${SharedConsts.DESKTOP_WIDTH})`)
    const navigate = useNavigate()

    const { openContactModal, receiveContactById } = useContactInteractionStore.getState()
    const {setChatInfoOpened,setAttachementViewOpened} = useChatStore()
    const { name, avatar: avatarUrl, userId } = SharedHelpers.fetchChatProps(chat)
    
    const bottomTitle = generateBottomTitle(chat)

    const handleArrowClick = useCallback(() => navigate(`/chat`), [navigate])

    const onUserProfileClick = useCallback(() => {
        if (!userId) return
        receiveContactById(userId).then((contact) => contact && openContactModal(contact))
    }, [userId, receiveContactById, openContactModal])


    const onUserOrChatClick = () =>{
        if(chat.type === 'individual'){
            onUserProfileClick()
        }else{
            setChatInfoOpened(true)
        }
    }

    const backToNavbarButton = (
        <ActionIcon size='2rem' onClick={handleArrowClick}>
            <IconArrowLeft size='2rem' />
        </ActionIcon>
    )

    return (
        <Group h={height} position="apart"  bg = 'dark.7'>
            <Group>
                {!isDesktop && backToNavbarButton}
                <SharedUi.CustomAvatar avatarSrc={avatarUrl} size='md' />
                <Stack spacing={0}>
                    <Group>
                        <SharedUi.UserName name={name} />
                        <Text>{chat.groupChat ? chat.groupChat.role : ''}</Text>
                    </Group>
                    <Text size='sm'>{bottomTitle}</Text>
                </Stack>
            </Group>
            <Group>
                <ActionIcon onClick={onUserOrChatClick}>
                    {chat.type === 'individual' ? <IconUser /> : <IconChalkboard />}
                </ActionIcon>
                <ActionIcon onClick={() => setAttachementViewOpened(true)}>
                    <IconPaperclip />
                </ActionIcon>
            </Group>
        </Group>
    )
}
