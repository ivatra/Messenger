import { useRef, useState } from "react";
import { Group, MantineStyleSystemProps, ScrollArea, Stack, StackProps } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";

import { ChatInput } from "../../../features";
import { ChatContext } from "../helpers/ChatContext";
import { IChat, ScrollableList } from "../../../shared";
import { TypingUsers } from "./TypingUsers";
import { MessagesList } from "./MessagesList";
import { useMessageStore } from "../../../entities";

interface IChatRoomProps {
    chat: IChat;
    display: MantineStyleSystemProps['display'];
}

export const ChatRoom: React.FC<IChatRoomProps> = ({ chat, display }) => {
    const { ref: elementSizeRef, width, height } = useElementSize();
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const { isLoading, messages } = useMessageStore()

    const stackProps: StackProps = {
        w: "100%",
        h: '100%',
        display: display,
        spacing: 0,
        onDragEnter: () => setIsDragging(true),
        onDragExit: () => setIsDragging(false)
    };

    return (
        <ChatContext.Provider value={chat}>
            <Stack {...stackProps} ref={elementSizeRef}  >
                <Group w='100%' h={60} bg='red' />
                <MessagesList messages={messages} isLoading={isLoading} />
                {chat.typingUsers.length >= 1 && <TypingUsers typingUsers={chat.typingUsers} />}
                <ChatInput
                    parentHeight={height}
                    isDragging={isDragging}
                    setIsDragging={setIsDragging}
                />
            </Stack>
        </ChatContext.Provider>

    );
};
