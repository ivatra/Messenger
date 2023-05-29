import produce from "immer";
import { IContentItem } from '../types/Model';
import { IMessagesApiResponse } from '../types/ApiResponse';
import { StoreType, createOrFindItem } from '../Store/MessageStore';

export async function handleMessages(chatId: number, newMessages: IMessagesApiResponse, currentPage: number, set: any) {
    const convertedMessages: IContentItem[] = newMessages.data.map((message) => ({
        type: 'Message',
        data: message,
    }));

    currentPage = Math.round(currentPage)
    
    set(
        produce((state: StoreType) => {
            const chatItems = createOrFindItem(state, chatId);
            chatItems.items.push(...convertedMessages);

            const messagesLen = chatItems.items.filter((item) => item.type === 'Message').length;
            chatItems.hasMore = messagesLen < newMessages.count;
            chatItems.totalCount = newMessages.count;
            chatItems.loadedPages.push(currentPage);
            chatItems.page = currentPage
            state.items[chatId] = { ...chatItems, items: chatItems.items };
        })
    );
}
