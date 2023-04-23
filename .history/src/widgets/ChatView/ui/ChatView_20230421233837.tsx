import { useParams } from "react-router-dom";

import { Box } from "@mantine/core";

import { ChatRoom } from "./ChatRoom";
import { ChatStart } from "./ChatStart";
import { useEffect } from "react";


interface IChatViewProps {
    currentChatId: number
}

//Atachement view overlay
//Attachements view overlay
//Chat info overlay

export const ChatView = () => {
    const { chatId } = useParams()

    useEffect(()=>{
        console.log(chatId)
    },[chatId])
    
    return (
        <Box pos="relative" w="100%" h="100%">
            {chatId
                ? <ChatRoom chatId={chatId} />
                : <ChatStart />}
        </Box>
    )
}