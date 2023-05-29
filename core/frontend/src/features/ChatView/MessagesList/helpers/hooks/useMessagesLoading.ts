import { useState, useEffect, useRef } from "react";

import { useDebouncedState } from "@mantine/hooks";

import { IContentItem, useMessageStore } from "../../../../../entities";

const limit: number = 30;

interface IMessagesLoading {
    items: IContentItem[] | undefined
    hasMore: boolean,
    totalCount: number | undefined
    page: number
    chatId: number,
    previousMsgIndex: number | null | undefined
    loadedPages: number[]
    msgIndex: number | null,
    scrollRef: any
}



export const useMessagesLoading = ({ hasMore, page, totalCount, items, chatId, scrollRef, msgIndex, loadedPages, previousMsgIndex }: IMessagesLoading) => {
    const [isMessagesLoading, setMessagesLoading] = useState<boolean>(false);
    const [scrollPosition, onScrollPositionChange] = useDebouncedState({ x: 0, y: 0 }, 100);

    const { receiveByOffset, receiveByMsg, setPage } = useMessageStore();

    const turnOffLoading = () => setMessagesLoading(false)

    const loadMore = (page: number) => {
        setMessagesLoading(true);
        receiveByOffset(chatId, page, limit);
    };

    useEffect(() => {
        if (!items && !totalCount && !msgIndex) {
            loadMore(0)
        } else if (msgIndex && msgIndex !== previousMsgIndex) {
            setMessagesLoading(true);
            receiveByMsg(chatId, msgIndex, limit)
        }
    }, [msgIndex]);

    const handlePagination = () => {
        const scrollHeight = scrollRef.current.scrollHeight - scrollRef.current.clientHeight;

        const onePageHeight = scrollHeight / loadedPages.length;

        const pageUserAt = ((scrollHeight - scrollPosition.y) / onePageHeight) + 1;

        const roundedPage = Math.round(pageUserAt);
        const truncatedPage = Math.trunc(pageUserAt);

        if (!roundedPage || !truncatedPage || roundedPage === -Infinity || roundedPage === -Infinity) return

        const reachedEndPoint = !totalCount || roundedPage * limit > totalCount

        if (reachedEndPoint) return

        if (truncatedPage !== page) {
            setPage(chatId, truncatedPage);
        }

        if (!isMessagesLoading && hasMore) {
            const itemsArleadyIn = loadedPages.includes(roundedPage);

            if (!itemsArleadyIn) {
                loadMore(roundedPage);
            }
        }
    }

    useEffect(() => {
        if (scrollRef.current) {
            handlePagination()
        };

    }, [scrollPosition]);


    return { isMessagesLoading, turnOffLoading, onScrollPositionChange }
};