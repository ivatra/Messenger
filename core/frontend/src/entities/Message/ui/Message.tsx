import { useContext, useRef } from "react";

import { Text, Box, Group, Stack, Image } from "@mantine/core";

import { IListMessage } from "../types/MessageModel";
import { ChatContext } from "../../../widgets";
import { SocketContext } from "../../../pages";
import { sendMessageReadEvent } from "../helpers/sendMessageReadEvent";
import { useInboxStore } from "../../InBox";

import { SharedTypes, SharedHooks, SharedHelpers } from "../../../shared";


const observerOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1
};

interface IMessageProps {
    message: IListMessage
    scrollAreaRef: React.RefObject<HTMLDivElement>
    isSentBySelf: boolean
    sender: SharedTypes.IUser
}

export const Message: React.FC<IMessageProps> = ({ message, sender, isSentBySelf, scrollAreaRef }) => {
    const { decrementCountUnreadMsgs } = useInboxStore.getState()

    const ref = useRef<HTMLDivElement>(null);

    const { chat } = useContext(ChatContext);
    const socket = useContext(SocketContext)

    const handleMessageRead = () => {
        if (socket) {
            sendMessageReadEvent(socket, chat.id, message.id)
            decrementCountUnreadMsgs(chat.id)
        }
    }

    SharedHooks.useIntersectionObserver({
        targetRef: ref,
        isObserved: !message.isRead && !isSentBySelf,
        options: { ...observerOptions, root: scrollAreaRef.current },
        executeOnIntersection: handleMessageRead
    });

    return (
        <Box
            data-key={message.index}
            style={{
                marginLeft: isSentBySelf ? 'auto' : 0,
                marginRight: isSentBySelf ? 0 : 'auto',
                alignSelf: isSentBySelf ? 'flex-end' : 'flex-start',
            }}
            mb='md'
            mt='md'
            ref={ref}
        >
            <Group>
                <Stack spacing='0px'>
                    <Group>
                        <Text>{sender.name}</Text>
                        <Text>{message.isRead ? 'read' : 'not read'}</Text>
                        <Text>{message.isMentioned && 'mentioned'}</Text>
                        {message.attachement &&<Image src={message.attachement.url}/>}
                        <Text> {SharedHelpers.formatDate(message.createdAt)}</Text>
                    </Group>
                    {/* {message.attachement && <CustomAvatar size='xl' avatarSrc={message.attachement?.url} />} */}
                    <Group>
                        {/* <CustomAvatar size='sm' avatarSrc={sender.avatar} key={sender.name} /> */}
                        <Text>{message.content}</Text>
                    </Group>
                </Stack>
                {message.status}
            </Group>



        </Box>
    )
}
