import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

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

export const ChatView: React.FC<IChatViewProps> = ({ chatId, isDisplayed }) => {
    const { receiveChat, chats, isLoading } = useChatStore()

    const [searchParams, _] = useSearchParams();

    var msgIndex: string | number | null = searchParams.get('msg_index')
    const parsedMsgIndex = msgIndex ? +msgIndex : null

    useEffect(() => {
        if (chatId && !chats[+chatId]) {
            receiveChat(+chatId)
        }

    }, [chatId])

    const chatRoomComponent = useMemo(() => {
        return Object.entries(chats).map(([key, chat]) => {
            const isCurrentChat = chat.id === (chatId ? +chatId : -1);
            return (
                <ChatRoom
                    msgIndex={isCurrentChat ? parsedMsgIndex : null}
                    chat={chat}
                    key={chat.id}
                    display={isCurrentChat ? 'flex' : 'none'} />
            );
        });

    }, [chatId, chats, msgIndex])

    return (
        (
            <Box pos="relative" w="100%" display={isDisplayed ? 'block' : 'none'} mah = '100vh' h = '100%'>
                {!chatId && <ChatStart />}
                {isLoading && <SharedUi.CenterLoader />}
                {chatRoomComponent}
            </Box>
        )
    );
}
