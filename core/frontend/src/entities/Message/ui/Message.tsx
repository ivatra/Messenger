import { useContext, useRef } from "react";

import { Box, Group } from "@mantine/core";

import { IListMessage } from "../types/Model";
import { ChatContext } from "../../../widgets";
import { SocketContext } from "../../../pages";
import { sendMessageReadEvent } from "../helpers/sendMessageReadEvent";
import { useInboxStore } from "../../InBox";

import { SharedTypes, SharedHooks } from "../../../shared";
import { BaseMessage } from "./BaseMessage";
import { MessageBody } from "./MessageBody";


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

    const onUserNameClick = () => {


    }

    SharedHooks.useIntersectionObserver({
        targetRef: ref,
        isObserved: !message.isRead && !isSentBySelf,
        options: { ...observerOptions, root: scrollAreaRef.current },
        executeOnIntersection: handleMessageRead
    });

    return (
        <Box
            maw='100%'
            w = '100%'
            ref = {ref}
            style={{ justifyContent: isSentBySelf ? 'flex-end' : 'flex-start' }}
            display='flex'>
            <Group maw='60%' w='60%'  position={isSentBySelf ? 'right' : 'left'} >
                <BaseMessage
                    chatType={chat.type}
                    isSentBySelf={isSentBySelf}
                    message={message}
                    onUserNameClick={onUserNameClick}
                    senderAvatarUrl={sender.avatar}
                    senderName={sender.name}
                />
            </Group>
        </Box>

    )
}
