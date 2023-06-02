import produce from "immer";
import { IContentItem } from '../types/Model';
import { IMessagesApiResponse } from '../types/ApiResponse';
import { StoreType, createOrFindItem } from '../Store/MessageStore';

export async function handleMessages(chatId: number, newMessages: IMessagesApiResponse, page: number, set: any) {
    const convertedMessages: IContentItem[] = newMessages.data.map((message) => ({
        type: 'Message',
        data: message,
    }));


    set(
        produce((state: StoreType) => {
            const chatItems = createOrFindItem(state, chatId);
            chatItems.items.push(...convertedMessages);

            const messagesLen = chatItems.items.filter((item) => item.type === 'Message').length;
            chatItems.hasMore = messagesLen < newMessages.count;
            chatItems.totalCount = newMessages.count;
            chatItems.page = page
            state.items[chatId] = { ...chatItems, items: chatItems.items };
        })
    );
}
