import { useEffect, useRef } from "react";

import { IContentItem, IMessageContentItem, useUserStore } from "../../../../../entities";


export const useHandleScroll = (renderedItems: JSX.Element[], chatId: number, items: IContentItem[] | undefined, scrollRef: React.RefObject<HTMLDivElement>, page: number) => {
    const hasScrolledToUnread = useRef<boolean>(false);

    const { id: userId } = useUserStore.getState().profile

    const scrollToBottom = () => scrollRef?.current?.scrollTo({ top: scrollRef.current.scrollHeight });

    useEffect(() => {
        if (hasScrolledToUnread.current || !items || !scrollRef.current) return

        const lastReadMessage = [...items].reverse().find((item) => item.type === 'Message'
            && !item.data.isRead
            && item.data.senderId !== userId) as IMessageContentItem | undefined

        if (lastReadMessage) {
            const lastReadElement = scrollRef.current.querySelector(`[data-key="${lastReadMessage.data.index}"]`);
            if (lastReadElement) {
                lastReadElement.scrollIntoView({ behavior: 'auto', block: 'end' });
            }
        } else {
            scrollToBottom();
        }

        hasScrolledToUnread.current = true;
    }, [renderedItems]);
};
