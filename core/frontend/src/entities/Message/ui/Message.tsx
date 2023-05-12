import { Text, Box, Group, Stack } from "@mantine/core"
import { CustomAvatar, IMessage, IUser, formatDate, useIntersectionObserver } from "../../../shared"
import { IListMessage } from "../types/Model"
import { useContext, useRef } from "react";
import { useMessageStore } from "../Store/MessageStore";
import { ChatContext } from "../../../widgets";
import { SocketContext } from "../../../pages";
import { sendMessageReadEvent } from "../helpers/sendMessageReadEvent";

const observerOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: "0px",
    threshold: 1
};


interface IMessageProps {
    message: IListMessage
    scrollAreaRef: React.RefObject<HTMLDivElement>
    isSentBySelf: boolean
    sender: IUser
}

export const Message: React.FC<IMessageProps> = ({ message, sender, isSentBySelf, scrollAreaRef }) => {
    const ref = useRef<HTMLDivElement>(null);

    const chat = useContext(ChatContext);
    const socket = useContext(SocketContext)

    const handleMessageRead = () => {
        if(socket){
            sendMessageReadEvent(socket, chat.id, message.id)
            
        }
    }
    useIntersectionObserver({
        targetRef: ref,
        isObserved: !message.isRead,
        options: { ...observerOptions, root: scrollAreaRef.current },
        executeOnIntersection: handleMessageRead
    });

    return (
        <Box
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
                        <Text> {formatDate(message.createdAt)}</Text>
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
