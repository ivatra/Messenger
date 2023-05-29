import { IInbox } from '../types/InboxModel';

export const updateInboxPinnedState = (pinnedInboxes: IInbox[], id: number) => {
    return pinnedInboxes.map((inbox) => inbox.id === id
        ? { ...inbox, isPinned: !inbox.isPinned }
        : inbox
    );
};