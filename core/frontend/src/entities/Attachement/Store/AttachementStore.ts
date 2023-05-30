import { create } from 'zustand'
import produce from "immer";

import { IAttachementStoreType, IAttachementStoreVariables } from '../types/AttachementStoreType';
import { api } from '../../../app';
import { SharedHelpers } from '../../../shared';
import { IAttachementApiResponse } from '../types/AttachementApiResponse';
import { IAttachement } from '../types/AttachementModel';



const initialState: IAttachementStoreVariables = {
    attachements: {},
    state: 'idle'
}


export const useMessageStore = create<IAttachementStoreType>((set, get) => ({
    ...initialState,
    async receiveByOffset(chatId, limit, offset) {
        const request = () =>
            api.get(`content/attachments/?limit=${limit}&offset=${offset}&chatId=${chatId}`);

        const newAttachments = await SharedHelpers.handleRequest<IAttachementApiResponse>(request, set);

        if (!newAttachments) return;

        set(
            produce((state: IAttachementStoreType) => {
                Object.assign(state.attachements, state.attachements, newAttachments.data)
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
                state.attachements[attachement.id] = attachement
            })
        );
    },
    async sendAttachement(chatId,attachment){
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
            state.attachements[attachment.id] = newAttachment;
        }));
    },
}))

