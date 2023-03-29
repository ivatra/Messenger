import { IMessage } from '../../../shared';
import { IInbox } from '../types/Model';
import { StoreType } from './InboxStore';

export const updateInboxPinnedState = (pinnedInboxes:IInbox[], id: number) => {
    return pinnedInboxes.map((inbox) => inbox.id === id
        ? { ...inbox, isPinned: !inbox.isPinned }
        : inbox
    );
};
export const updateInboxMessage = (state: StoreType, newMessage: IMessage, id: number) => {
    return state.inboxes.map((inbox) => inbox.id === id
        ? {
            ...inbox,
            message: newMessage,
            countOfUnreadMsgs: inbox.countOfUnreadMsgs + 1
        }
        : inbox
    );
};
