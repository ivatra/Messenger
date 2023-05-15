import { create } from 'zustand'
import produce from "immer";

import { IAttachementsContent, IChatContent, IMessageStore, IStoreAttachement, IStoreMessage } from '../types/Store'
import { IContentItem, IListMessage, SentStatuses } from '../types/Model'
import { IMessagesApiResponse } from '../types/ApiResponse'
import { createMessage } from '../helpers/createMessage'
import { useUserStore } from '../../User'



import { api } from '../../../app'
import { IStoreFeedback, getRandomArbitrary as getRandomArbitrary, handleRequest } from '../../../shared'
import { useInboxStore } from '../..';

export type StoreType = IMessageStore & IStoreFeedback

const initialState = {
    items: [],
    attachments: [],

    limit: 30,
    isLoading: false,
    isError: false
}

function createOrFindItem(state: StoreType, chatId: number): IChatContent {
    return state.items[chatId] || ({ items: [], page: 1, hasMore: true, totalCount: undefined, communicationMessagesTally: 0 } as IChatContent);
}

function createOrFindAttachement(state: StoreType, chatId: number): IAttachementsContent {
    return state.attachments[chatId] || { attachments: [], page: 1, hasMore: true, totalCount: undefined } as IAttachementsContent;
}


export const useMessageStore = create<StoreType>((set, get) => ({
    ...initialState,
    receiveMessages: async (chatId, offset, limit) => {
        const { items } = get()

        const currentChat = items[chatId]

        const userSentMessageCount = currentChat ? currentChat.communicationMessagesTally : 0

        const request = () => api.get(`content/chat/${chatId}/messages/?offset=${offset + userSentMessageCount}&limit=${limit}`);

        const newMessages = await handleRequest<IMessagesApiResponse>(request, set);

        if (!newMessages) return;

        const convertedMessages: IContentItem[] = newMessages.data.map((message) => ({
            type: 'Message',
            data: message,
        }));

        set(
            produce((state: StoreType) => {
                const chatItems = createOrFindItem(state, chatId);
                chatItems.items.push(...convertedMessages);

                const sorted = chatItems.items.sort()
                const messagesLen = chatItems.items.filter((item) => item.type === 'Message').length

                chatItems.hasMore = messagesLen < newMessages.count;
                chatItems.totalCount = newMessages.count
                state.items[chatId] = { ...chatItems, items: sorted };
            })
        );
    },
    receiveAttachments: async (chatId, limit) => {
        const page = get().attachments[chatId] ? get().attachments[chatId].page : 1;
        const offset = page * limit;

        const request = () =>
            api.get(`content/chat/${chatId}/attachments/?limit=${limit}&offset=${offset}`);

        const newAttachments = await handleRequest<IMessagesApiResponse>(request, set);

        if (!newAttachments) return;

        set(
            produce((state: StoreType) => {
                const chatAttachments = createOrFindAttachement(state, chatId)
                chatAttachments.attachments.push(...newAttachments.data);
                chatAttachments.hasMore = newAttachments.count >= chatAttachments.attachments.length;
                chatAttachments.totalCount = chatAttachments.attachments.length
                state.attachments[chatId] = chatAttachments;
            })
        );
    },
    sendMessage: async (chatId, message, attachment) => {
        const { id } = useUserStore.getState().profile;

        const randomNumber = Date.now()

        const newMessage = createMessage(id, randomNumber, attachment, message);

        const { updateMessage } = useInboxStore.getState()
        updateMessage(newMessage, chatId, false)

        set(
            produce((state) => {
                const chatItems = createOrFindItem(state, chatId);
                chatItems.items.unshift({ type: 'Message', data: newMessage });
            })
        );

        const formData = new FormData();

        formData.append('content', message);
        if (attachment) {
            formData.append('attachment', attachment, attachment.name);
        }

        const request = () =>
            api.post(`content/chat/${chatId}/messages`, {
                body: formData,
            });

        const response = await handleRequest<IListMessage>(request, set);

        const updateMessageStatus = (status: SentStatuses) => {
            set(
                produce((state: StoreType) => {
                    const chatItems = state.items[chatId];
                    const updatedItems = chatItems.items.map((item) => {
                        if (item.type === 'Message' && item.data.id === newMessage.id) {
                            return produce(item, (draft) => {
                                draft.data.status = status;
                                draft.data.index = response?.index ? response.index : randomNumber
                                draft.data.id = response?.id ? response.id : randomNumber
                            });
                        }
                        return item;
                    });
                    chatItems.items = updatedItems;
                })
            );
        };

        if (response) {
            updateMessageStatus('sent');
        } else {
            updateMessageStatus('error');
        }
    },
    sendAttachment: async (chatId, attachment) => {
        const request = () =>
            api.post(`content/chat/${chatId}/attachments`, {
                json: {
                    attachment: attachment,
                },
            });
        const newAttachment = await handleRequest<IListMessage>(request, set);

        if (!newAttachment) return;

        set(produce((state: StoreType) => {
            const chatAttachments = state.attachments[chatId] || { attachments: [], page: 1, hasMore: false };
            chatAttachments.attachments.unshift(newAttachment);
            state.attachments[chatId] = chatAttachments;
        }));
    },
    addItemExternal: (chatId, contentItem) => {
        set(produce((state) => {
            const chatItems = createOrFindItem(state, chatId);
            chatItems.items.unshift(contentItem);
        }));
        get().increaseCommunicationMessagesTally(chatId)
    },
    setPage: (chatId, page) => {
        set(produce((state) => {
            state.items[chatId].page = page;
        }));
    },
    increaseCommunicationMessagesTally: (chatId) => {
        set(produce((state: StoreType) => {
            state.items[chatId].communicationMessagesTally++;
        }));
    },
    setMessageRead: (chatId, messageId) => {
        set(produce((state: StoreType) => {
            const chatItems = state.items[chatId] || { items: [], page: 1, hasMore: false };
            const updatedItems = chatItems.items.map((item) => {
                if (item.type === 'Message' && item.data.id === messageId) {
                    return produce(item, (draft: any) => {
                        draft.data.isRead = true;
                    });
                }
                return item;
            });
            state.items[chatId].items = updatedItems;
        }));
    },
}));
