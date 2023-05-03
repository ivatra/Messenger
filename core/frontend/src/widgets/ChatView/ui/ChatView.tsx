import { useEffect, useMemo } from "react"
import { useParams } from "react-router-dom";

import { Box } from "@mantine/core";

import { ChatRoom } from "./ChatRoom";
import { ChatStart } from "./ChatStart";

import { useChatStore } from "../../../entities";
import { CenterLoader } from "../../../shared";

//Atachement view overlay
//Attachements view overlay
//Chat info overlay
//Do not forget about isTyping events

export const ChatView = () => {
    const { chatId } = useParams()

    const { receiveChat, chats, isLoading, setCurrentChatId } = useChatStore()

    useEffect(() => {
        if (!chatId) return setCurrentChatId(-1)

        setCurrentChatId(+chatId)
        
        if (chats[+chatId]) return
        
        const chatExists = chats[+chatId]

        if (!chatExists) receiveChat(+chatId)

    }, [chatId])

    const chatRoomComponent = useMemo(() => {
        if (!chatId) return <ChatStart />
        if (isLoading) return <CenterLoader />
        return Object.entries(chats).map(([key, chat]) => (
            <ChatRoom chat={chat} key={chat.id} display={chat.id === +chatId ? 'flex' : 'none'} />
        ))

    }, [chatId, chats])

    return (
        <Box pos="relative" w="100%" h="100%">
            {chatRoomComponent}
        </Box>
    )
}