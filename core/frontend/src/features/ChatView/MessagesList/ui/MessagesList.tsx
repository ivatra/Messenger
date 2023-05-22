import { Box, ScrollArea, ScrollAreaProps, Stack, StackProps } from "@mantine/core";

import { useMessagesLoading } from "../helpers/hooks/useMessagesLoading";
import { useRenderMessages } from "../helpers/hooks/useRenderMessages";
import { useHandleScroll } from "../helpers/hooks/useHandleScroll";

import { IContentItem } from "../../../../entities";
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


interface IMessagesListProps {
    items: IContentItem[] | undefined;
    page: number
    chatId: number
    hasMore: boolean
    totalCount: number | undefined
    scrollRef: React.RefObject<HTMLDivElement>
    isLoading: boolean;
}


/* 
    after 1 enter to  chat scroll above not read messages
*/
export const MessagesList: React.FC<IMessagesListProps> = ({
    items,
    page,
    totalCount,
    hasMore,
    chatId,
    scrollRef
}): JSX.Element => {
    const { isMessagesLoading, turnOffLoading, onScrollPositionChange } = useMessagesLoading({
        hasMore,
        items,
        totalCount,
        page,
        chatId,
        scrollRef
    })

    const { renderedItems } = useRenderMessages({
        items,
        page,
        scrollRef,
        turnOffLoading,
    })

    useHandleScroll(
        renderedItems,
        chatId,
        items,
        scrollRef,
        page
    )

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
