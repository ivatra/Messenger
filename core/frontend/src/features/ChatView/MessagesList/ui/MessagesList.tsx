import { useContext, useState } from "react";

import { Box, ScrollArea, ScrollAreaProps, Stack } from "@mantine/core";
import { useDebouncedValue, useDidUpdate } from "@mantine/hooks";

// import { useMessagesLoadingOld } from "../helpers/hooks/useMessagesLoadingOld";
import { IChatContent } from "../../../../entities/Message/types/Store";

import { ChatContext } from "../../../../widgets";
import { IContentItem, IDictMessage, useMessageStore, useUserStore } from "../../../../entities";
import { useMessagesLoading as useItemsLoading } from "../helpers/hooks/new/useItemsLoading";
import renderItem from "../helpers/renderMessageItem";
import { SharedUi } from "../../../../shared";
import { IMessageContentItem } from "../../../../entities/Message/types/Model";


/*
IconMessageCircleSearch additonal section for searching in chat
at basic entering chat - scroll to bottom
fix shevron (show it when neccesery)
message (user shall be clickable)
when clicking on inbox also should be redirect to message as in search for chat

inbox additional option - open user profile or group profile

*/

interface IMessagesListProps extends IChatContent {
    page: number
    chatId: number
    scrollRef: React.RefObject<HTMLDivElement>
}

const limit = 25

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

    const [itemsByPage, setItemsByPage] = useState<IDictMessage>({})
    const { receiveByOffset } = useMessageStore.getState()
    const { id } = useUserStore().profile

    const [searchValue, setSearchValue] = useState<string>('0');
    const [debounced] = useDebouncedValue<number>(+searchValue, 400);

    useDidUpdate(() => {
        if (!totalCount) return

        const arr: IDictMessage = {}
        for (var i = 0; i < items.length; i += limit) {
            const item = (items[i +1 ].type === 'Message' && items[i]) as IMessageContentItem

            const itemo = (totalCount / limit) - (item.data.index / limit)
            arr[Math.trunc(itemo)] = items.slice(i, i + limit)
        }
        setItemsByPage(arr)
    }, [items])

    // useDidUpdate(() => {
    //     if (!totalCount) return;

    //     const arr: IDictMessage = {};
    //     for (let i = 0; i < items.length; i++) {
    //         const item = items[i];

    //         if (item.type !== 'Message') continue

    //         const page = Math.ceil((totalCount - item.data.index) / limit);
    //         if (!arr[page]) {
    //             arr[page] = [];
    //         }
    //         console.log(page)
    //         arr[page].push(item);
    //     }
    //     setItemsByPage(arr);
    // }, [items, limit, totalCount]);
useDidUpdate(()=>{
    
},[itemsByPage])
    const { renderedItems, isLoading } = useItemsLoading({
        scrollRef,
        TotalMessages: totalCount ? totalCount : 1270,
        limit,
        searchValue: debounced === 0 ? null : debounced,
        messages: itemsByPage,
        renderItem: (item: IContentItem) => renderItem(item.type === 'Message' && item.data.index === debounced,chat, scrollRef, id, item),
        receive: (offset: number, limit: number) => receiveByOffset(chat.id, offset, limit)
    })

    const scrollAreaProps: ScrollAreaProps = {
        viewportRef: scrollRef,
        type: 'always',
        w: '100%',
        h: '100%',
        mah:'100%'
    }

    if (!items && !isLoading) {
        return <Box h='100%'>Nothing found</Box>
    } else {
        return (

                    <ScrollArea {...scrollAreaProps}>
                        {isLoading && <SharedUi.CenterLoader />}
                        {renderedItems}
                        {/* <ScrollShevron onClick={() => scrollToBottom()} position="bottom" pos={{ bottom: '1rem', right: '1rem' }} visible={true} /> */}
                    </ScrollArea>

            );
    }
};
