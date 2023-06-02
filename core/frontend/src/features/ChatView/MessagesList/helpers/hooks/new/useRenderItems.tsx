import { useMemo, useState, useEffect } from "react";
import { Text } from "@mantine/core";
import { renderMessages } from "./renderMessages";
import { IContentItem, IDictMessage } from "../../../../../../entities";

interface IRenderMsgsProps {
    messages: IDictMessage;
    pages: number[];
    searchValue: number | null;
    renderItem: (msg: IContentItem) => JSX.Element;
    topRef: (element: any) => void;
    bottomRef: (element: any) => void;
}

export const useRenderItems = ({
    bottomRef,
    messages,
    pages,
    searchValue,
    topRef,
    renderItem,
}: IRenderMsgsProps) => {

    const renderedItems = useMemo(() => {
        const flatMessages = pages.flatMap((page) => messages[page]);
        
        const filteredMessages = flatMessages.filter((msg) => msg !== undefined);

        const renderedMessageItems = filteredMessages.map((msg) => renderItem(msg))

        const renderedElements = renderMessages({
            messages: renderedMessageItems,
            bottomRef,
            topRef,
            searchValue,
        });

        return renderedElements
    }, [messages, pages])

    return renderedItems;
};
