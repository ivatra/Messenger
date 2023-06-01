import { useContext, useEffect, useState } from "react";

import { Box, ScrollArea, ScrollAreaProps, Stack, StackProps } from "@mantine/core";
import { usePrevious } from "@mantine/hooks";

import { useMessagesLoading } from "../helpers/hooks/useMessagesLoading";
import { useRenderMessages } from "../helpers/hooks/useRenderMessages";
import { useManageOverflowLocation } from "../helpers/hooks/useHandleScroll";
import { IChatContent } from "../../../../entities/Message/types/MessageStoreType";

import { ChatContext } from "../../../../widgets";
import { SharedUi } from "../../../../shared";


/*
IconMessageCircleSearch additonal section for searching in chat
at basic entering chat - scroll to bottom
fix shevron (show it when neccesery)
message (user shall be clickable)
when clicking on inbox also should be redirect to message as in search for chat

inbox additional option - open user profile or group profile

*/

const itemsContainerProps: StackProps = {
    align: 'center',
    style: { flexDirection: 'column-reverse' },
    mah: '100%'
}


interface IMessagesListProps extends IChatContent {
    page: number
    chatId: number
    scrollRef: React.RefObject<HTMLDivElement>
}


export const MessagesList: React.FC<IMessagesListProps> = ({
    items,
    page,
    loadedPages,
    totalCount,
    hasMore,
    chatId,
    scrollRef
}): JSX.Element => {
    const { msgIndex, chat } = useContext(ChatContext)
    const previousMsgIndex = usePrevious(msgIndex);

    const { isMessagesLoading, turnOffLoading, onScrollPositionChange } = useMessagesLoading({
        msgIndex,
        hasMore,
        items,
        loadedPages,
        totalCount,
        page,
        previousMsgIndex,
        chatId,
        scrollRef
    })

    const { renderedItems } = useRenderMessages({
        items,
        page,
        scrollRef,
        turnOffLoading,
    })

    useManageOverflowLocation({
        items,
        previousMsgIndex,
        renderedItems,
        scrollRef,
        msgIndex
    })

    const scrollAreaProps: ScrollAreaProps = {
        viewportRef: scrollRef,
        h: '100%',
        type: 'always',
        w: '100%',
        onScrollPositionChange: onScrollPositionChange
    }

    if (!items && !isMessagesLoading) {
        return <Box h='100%'>Nothing found</Box>
    } else {
        return (
            (<ScrollArea {...scrollAreaProps}>
                {isMessagesLoading && <SharedUi.CenterLoader />}
                <Stack {...itemsContainerProps} >
                    {renderedItems}
                </Stack>
                {/* <ScrollShevron onClick={() => scrollToBottom()} position="bottom" pos={{ bottom: '1rem', right: '1rem' }} visible={true} /> */}
            </ScrollArea>)
        );
    }
};
