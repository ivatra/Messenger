import { useEffect, useRef, useState } from "react";

import { useHandleIntersectionEntry } from "./useHandleInteraction";
import { useMsgsPages } from "./useMsgsPages";
import { useManageOverFlowPosition } from "./useManageOverFlowPosition";
import { useHandleSearch } from "./useHandleSearch";
import { useRenderItems } from "./useRenderItems";

import { IContentItem, IDictMessage } from "../../../../../../entities";


interface IProps {
    TotalMessages: number
    scrollRef: React.RefObject<HTMLDivElement>,
    limit: number,
    searchValue: number | null,
    messages: IDictMessage,
    renderItem: (msg: IContentItem) => JSX.Element
    receive: (offset: number, limit: number) => void
}

export const useMessagesLoading = (
    {
        messages,
        receive,
        scrollRef,
        limit,
        searchValue,
        renderItem,
        TotalMessages
    }: IProps
) => {
    const [isLoading, setLoading] = useState<boolean>(false)
    const needScrollToMsg = useRef<boolean>(false);
    const needScrollToBottom = useRef<boolean>(false)

    const { clearSearchPages, pages, addPage, addRegularPage } = useMsgsPages(searchValue)

    const loadMore = (page: number) => {
        const reachedThreshold = page > Math.ceil((TotalMessages / limit))
        if (typeof page === 'number' && isFinite(page)) {
            if (!reachedThreshold) {
                if (!messages[page] && !isLoading) {
                    console.log(page * limit)
                    receive(page * limit, limit);
                }
                addPage(page)
            }
        }
    }

    const { bottomRef, topRef } = useHandleIntersectionEntry({
        loadMore,
        pages,
        threshold: 0.1,
        scrollRef,
        searchValue
    })

    const renderedItems = useRenderItems({
        bottomRef,
        messages,
        renderItem,
        pages,
        searchValue,
        topRef
    })

    useEffect(() => {
        receive(0, limit)
        addRegularPage(0)
        needScrollToBottom.current = true
    }, []);

    useManageOverFlowPosition({
        renderedItems,
        setLoading,
        scrollRef,
        searchValue,
        needScrollToMsg,
        needScrollToBottom
    })

    useHandleSearch({
        clearSearchPages,
        limit,
        loadMsgsBySearch: loadMore,
        needScrollToMsg,
        needScrollToBottom,
        searchValue,
        totalMessages: TotalMessages
    })


    return {
        renderedItems,
        isLoading
    }
};


