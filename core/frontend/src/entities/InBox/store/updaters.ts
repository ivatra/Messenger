import { IDictInbox } from '../types/InboxModel';

export const updateInboxPinnedState = (pinnedInboxes: IDictInbox[], id: number) => {
    return pinnedInboxes.map((inbox) => inbox.id === id
        ? { ...inbox, isPinned: !inbox.isPinned }
        : inbox
    );
};