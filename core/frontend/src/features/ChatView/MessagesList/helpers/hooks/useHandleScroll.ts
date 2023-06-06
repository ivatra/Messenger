import { useEffect, useRef } from "react";

import { IContentItem, IMessageContentItem, useUserStore } from "../../../../../entities";

export interface IProps {
    renderedItems: JSX.Element[];
    msgIndex: number | null
    previousMsgIndex: number | null | undefined
    items: IContentItem[] | undefined;
    scrollRef: React.RefObject<HTMLDivElement>;
}

export const useManageOverflowLocation = ({ items, renderedItems, scrollRef, msgIndex, previousMsgIndex }: IProps) => {
    const hasScrolledToUnread = useRef<boolean>(false);

    const { id: userId } = useUserStore.getState().profile

    const scrollToBottom = () => scrollRef?.current?.scrollTo({ top: scrollRef.current.scrollHeight });


    useEffect(() => {
        if (!items || !scrollRef.current) return

        const scrollToSpecificMsg = (msgIndex: number) => {
            const element = scrollRef?.current?.querySelector(`[data-key="${msgIndex}"]`);
            element?.scrollIntoView({ behavior: 'auto', block: 'end' });
        }

        if (!hasScrolledToUnread.current) {
            const lastReadMessage = [...items].reverse().find((item) => item.type === 'Message'
                && !item.data.isRead
                && item.data.senderId !== userId) as IMessageContentItem | undefined

            if (lastReadMessage) {
                scrollToSpecificMsg(lastReadMessage.data.index)
            } else {
                scrollToBottom()
            }
        }
        if (msgIndex) {
            scrollToSpecificMsg(msgIndex)

        }
        hasScrolledToUnread.current = true;
    }, [renderedItems]);
};
