import { RefObject, useContext, useEffect, useState } from "react";

import { useDidUpdate } from "@mantine/hooks";

import renderItem from "../renderMessageItem";

import { ChatContext } from "../../../../../widgets";
import { IContentItem, useUserStore } from "../../../../../entities";




interface IUseRenderMessagesProps {
    page: number
    items: IContentItem[] | undefined
    scrollRef: RefObject<HTMLDivElement>
    turnOffLoading: () => void
}

export const useRenderMessages = ({ items,turnOffLoading, scrollRef }: IUseRenderMessagesProps) => {
    const [renderedItems, setRenderedItems] = useState<JSX.Element[]>([]);

    const chat = useContext(ChatContext);

    const { id: userAgentId } = useUserStore().profile;

    useDidUpdate(() => {
        const fetchAndRenderItems = async () => {
            if (!items) return

            const itemsComponent = await Promise.all(items.map((item) => renderItem(
                chat,
                scrollRef,
                userAgentId,
                item
            )))
            setRenderedItems(itemsComponent);
            turnOffLoading()
        };

        fetchAndRenderItems();
    }, [items]);


    return { renderedItems }

}