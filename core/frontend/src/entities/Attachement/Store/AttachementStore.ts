import { create } from 'zustand'
import produce from "immer";

import { IAttachementStoreType, IAttachementStoreVariables } from '../types/AttachementStoreType';
import { IAttachementApiResponse } from '../types/AttachementApiResponse';
import { IAttachement } from '../types/AttachementModel';

import { api } from '../../../app';
import { SharedHelpers } from '../../../shared';

const initialState: IAttachementStoreVariables = {
    attachements: { byId: {}, idByChatId: {} },
    state: 'idle'
}


export const useAttachementStore = create<IAttachementStoreType>((set, get) => ({
    ...initialState,
    async receiveByOffset(chatId, limit, offset) {
        const request = () =>
            api.get(`content/attachments/?limit=${limit}&offset=${offset}&chatId=${chatId}`);

        const newAttachments = await SharedHelpers.handleRequest<IAttachementApiResponse>(request, set);

        if (!newAttachments) return;

        set(
            produce((state: IAttachementStoreType) => {
                Object.assign(state.attachements.byId, state.attachements.byId, newAttachments.data)

                const chatAttachs = state.attachements.idByChatId[chatId]

                for (const [key, value] of Object.entries(newAttachments)) {
                    chatAttachs.add(Number(key))
                }
            })
        );
    },
    async receiveById(attachId) {
        const request = () =>
            api.get(`content/attachments/${attachId}`);

        const attachement = await SharedHelpers.handleRequest<IAttachement>(request, set)

        if (!attachement) return

        set(
            produce((state: IAttachementStoreType) => {
                state.attachements.byId[attachement.id] = attachement
                state.attachements.idByChatId[attachement.chatId].add(attachement.id)
            })
        );
    },
    async sendAttachement(chatId, attachment) {
        const request = () =>
            api.post(`content/{chatId}/attachments`, {
                json: {
                    chatId: chatId,
                    attachment: attachment,
                },
            });

        const newAttachment = await SharedHelpers.handleRequest<IAttachement>(request, set);

        if (!newAttachment) return;

        set(produce((state: IAttachementStoreType) => {
            state.attachements.byId[attachment.id] = newAttachment;
            state.attachements.idByChatId[chatId].add(attachment.id)
        }));
    },
}))

