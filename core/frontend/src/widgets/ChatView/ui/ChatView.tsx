import { useEffect, useMemo } from "react";

import { Box } from "@mantine/core";

import { ChatRoom } from "./ChatRoom";
import { ChatStart } from "./ChatStart";

import { useChatStore } from "../../../entities";
import { SharedUi, SharedTypes } from "../../../shared";

//Atachement view overlay
//Attachements view overlay
//Chat info overlay
//Do not forget about isTyping events

interface IChatViewProps {
    chatId: number | undefined
    isDisplayed: boolean
}

export const ChatView: React.FC<IChatViewProps> = ({ chatId,isDisplayed }) => {
    const { receiveChat, chats, isLoading, setCurrentChatId } = useChatStore()
    useEffect(() => {
        if (!chatId) return

        const chatExists: SharedTypes.IChat | undefined = chats[+chatId]
        if (!chatExists) receiveChat(+chatId)

    }, [chatId])

    const chatRoomComponent = useMemo(() => {
        return Object.entries(chats).map(([key, chat]) => (
            <ChatRoom chat={chat} key={chat.id} display={chat.id === (chatId ? +chatId : -1)  ? 'flex' : 'none'} />
        ))

    }, [chatId, chats])
    
    return (
        (<Box pos="relative" w="100%" display={isDisplayed ? 'block' : 'none'} h='100%' >
            {!chatId && <ChatStart />}
            {isLoading &&  <SharedUi.CenterLoader />}
            {chatRoomComponent}
        </Box>)
    );
}
