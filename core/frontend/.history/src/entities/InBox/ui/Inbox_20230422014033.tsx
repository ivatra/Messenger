import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Group, GroupProps, Stack } from "@mantine/core";

import { IInbox } from "../types/Model";
import { MessageFotter } from "./MessageFotter";
import { MessageHeader } from "./MessageHeader/MessageHeader";
import { fetchProps } from "../helpers/fetchProps";

import { CustomAvatar, formatDate } from "../../../shared";


const groupProps: GroupProps = {
    spacing: 'xs',
    noWrap: true,
    my: '5px',
    mx: '10px'
}

//inbox will have count of unread msgs

interface IInboxProps {
    inbox: IInbox
}

export const Inbox: React.FC<IInboxProps> = ({ inbox }) => {
    const [selected, setSelected] = useState<boolean>(false)
    const messageText = inbox.message.content

    const { name, avatar } = fetchProps(inbox)
    const formattedDate = formatDate(inbox.message.updatedAt)

    const navigate = useNavigate();

    const boxProps = {
        onMouseEnter: () => setSelected(true),
        onMouseLeave: () => setSelected(false),
        onClick: () => navigate(`/chat/${inbox.id}`),
        bg: selected ? 'dark.5' : 'initial'
    }
    return (
        <Box {...boxProps} >
            <Group {...groupProps}>
                <CustomAvatar size={'md'} avatarSrc={avatar} />
                <Stack spacing={0} mx={0} w='100%'>
                    <MessageHeader
                        name={name}
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


