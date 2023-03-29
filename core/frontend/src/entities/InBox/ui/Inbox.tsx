import { Avatar, Box, BoxProps, Group, GroupProps, Stack } from "@mantine/core";
import { IInbox } from "../types/Model";
import { MessageText } from "./MessageText";
import { MessageHeader } from "./MessageHeader/MessageHeader";
import { IMAGES_URL, formatDate } from "../../../shared";
import { fetchProps } from "../helpers/fetchProps";
import { useState } from "react";
import useInboxStore from "../store/InboxStore";
import { useElementSize } from "@mantine/hooks";

const avatarProps = {
    radius: 'xl',
    size: 'md'
}

const groupProps: GroupProps = {
    spacing: 'xs',
    noWrap: true,
    my: '5px',
    mx: '10px'
}

//inbox will have date - (right top)
//inbox will have count of unread msgs
//inbox will have menu with option (Pin)

interface IInboxProps {
    inbox: IInbox
}
export const Inbox: React.FC<IInboxProps> = ({ inbox}) => {
    const [selected, setSelected] = useState<boolean>(false)
    const messageText = inbox.message.content
    const { name, avatar } = fetchProps(inbox)
    const formattedDate = formatDate(inbox.message.updatedAt)

    const boxProps = {
        onMouseEnter: () => setSelected(true),
        onMouseLeave: () => setSelected(false),
        bg: selected ? 'dark.5' : 'initial'
    }

    return (
        <Box {...boxProps}>
            <Group {...groupProps}>
                <Avatar {...avatarProps} src={IMAGES_URL + avatar} />
                <Stack spacing={0} mx={0} w='100%'>
                    <MessageHeader
                        name={name}
                        inbox={inbox}
                        messageSentDate={formattedDate}
                        inboxSelected={selected}
                    />
                    <MessageText content={messageText} />
                </Stack>
            </Group>
        </Box>

    )
};


