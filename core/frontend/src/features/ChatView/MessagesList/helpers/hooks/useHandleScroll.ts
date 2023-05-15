import { useEffect } from "react";
import { IContentItem, useInboxStore } from "../../../../../entities";


export const useHandleScroll = (renderedItems: JSX.Element[], chatId: number, items: IContentItem[] | undefined, scrollRef: any, page: number) => {
    const scrollToBottom = () => scrollRef?.current?.scrollTo({ top: scrollRef.current.scrollHeight });

    const { inboxes, pinnedInboxes } = useInboxStore()

    useEffect(() => {

        const currentInbox = inboxes.find((inbox) => inbox.chat.id === chatId)
            || pinnedInboxes.find((inbox) => inbox.chat.id === chatId)
        
        if(currentInbox && items && currentInbox.countUnreadMsgs !== 0){
            const lastReadMessage = items.find((item) => item.type === 'Message' && !item.data.isRead)
            if(lastReadMessage){

            }
        }

        // if (page === 1) {
        //     scrollToBottom();
        // }
    }, [renderedItems]);

}