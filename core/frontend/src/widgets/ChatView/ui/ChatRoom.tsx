import { useEffect, useRef, useState } from "react";

import { Group, MantineStyleSystemProps, Stack, StackProps } from "@mantine/core";
import { useElementSize, useMediaQuery } from "@mantine/hooks";

import { TypingUsers } from "./TypingUsers";
import { ChatContext } from "../helpers/ChatContext";

import { ChatInput, MessagesList } from "../../../features";
import { useMessageStore } from "../../../entities";
import { DESKTOP_WIDTH, IChat } from "../../../shared";
import { ChatHeader } from "./ChatHeader";
import React from "react";

interface IChatRoomProps {
    chat: IChat;
    display: MantineStyleSystemProps['display'];
}

export const ChatRoom: React.FC<IChatRoomProps> = ({ chat, display }) => {
    const [isDragging, setIsDragging] = useState<boolean>(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    const isDesktop = useMediaQuery(`(min-width: ${DESKTOP_WIDTH})`);

    const childrenHeight = isDesktop ? '60px' : '7rem'

    const { ref: elementSizeRef, width, height } = useElementSize();
    const { isLoading,  items } = useMessageStore()

    const scrollToBottom = () => scrollRef?.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });

    const stackProps: StackProps = {
        w: "100%",
        h:'100%',
        display: display,
        spacing: 0,
        onDragEnter: () => setIsDragging(true),
        onDragExit: () => setIsDragging(false)
    };

    return (
        <ChatContext.Provider value={chat}>
            <Stack {...stackProps} ref={elementSizeRef}>
                <ChatHeader chat={chat} height={childrenHeight} />
                <MessagesList
                    {...items[chat.id]}
                    chatId = {chat.id}
                    isLoading={isLoading}
                    scrollRef={scrollRef} />
                <TypingUsers typingUsers={chat.typingUsers} />
                <ChatInput
                    parentHeight={height}
                    height={childrenHeight}
                    isDragging={isDragging}
                    setIsDragging={setIsDragging}
                    scrollListToBottom={scrollToBottom} />
            </Stack>
        </ChatContext.Provider>

    );
};


export const MemoizedChatRoom = React.memo(ChatRoom)
