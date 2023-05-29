import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Group, GroupProps, Stack } from "@mantine/core";

import { IInbox } from "../types/Model";
import { MessageFotter } from "./MessageFotter";
import { MessageHeader } from "./MessageHeader/MessageHeader";

import { SharedUi, SharedHelpers } from "../../../shared";


const groupProps: GroupProps = {
    spacing: 'xs',
    noWrap: true,
    my: '5px',
    mx: '10px'
}


interface IInboxProps {
    inbox: IInbox
    isMatched: boolean
    active: boolean
}

export const Inbox: React.FC<IInboxProps> = ({ inbox, active, isMatched }) => {
    const [selected, setSelected] = useState<boolean>(false)
    const messageText = inbox.message.content

    const formattedDate = SharedHelpers.formatDate(inbox.message.createdAt)

    const navigate = useNavigate();


    const navigateToChat = () => {
        const params = isMatched ? `msg_index=${inbox.message.index}` : ''
        
        navigate(`/chat/${inbox.chatId}?${params}`)
    }

    const boxProps = {
        onMouseEnter: () => setSelected(true),
        onMouseLeave: () => setSelected(false),
        onClick: navigateToChat,
        bg: active ? 'blue.6' :
            selected ? 'dark.5' : 'initial',
    }
    return (
        <Box {...boxProps} >
            <Group {...groupProps} noWrap>
                <SharedUi.CustomAvatar size={'md'} avatarSrc={inbox.avatar} />
                <Stack spacing={0} mx={0} w='100%'>
                    <MessageHeader
                        name={inbox.name}
                        inbox={inbox}
                        messageSentDate={formattedDate}
                        inboxSelected={selected}
                    />
                    <MessageFotter content={messageText} countOfUnreadMsgs={inbox.countUnreadMsgs} />
                </Stack>
            </Group>
        </Box>
    )
};


