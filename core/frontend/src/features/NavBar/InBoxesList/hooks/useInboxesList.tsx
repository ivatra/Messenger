import { useMemo } from "react";

import { Box, Stack } from "@mantine/core";

import { IInbox, Inbox, useChatStore, useInboxStore, useMessageStore, IMessageContentItem, IContentItem } from "../../../../entities";
import { SharedUi } from "../../../../shared";


interface IInboxesProps {
    ref: (element: any) => void;
    searchValue: string
}

export const useInboxesList = ({ ref, searchValue }: IInboxesProps) => {
    const {
        pinnedInboxes,
        inboxes,
        isMatched,
        matchedInboxes,
    } = useInboxStore();
    

    const { currentChatId } = useChatStore();
    const { items } = useMessageStore();

    const processInbox = (inbox: IInbox) => {
        return (
            <Inbox
                key={inbox.id}
                inbox={inbox}
                active={currentChatId === inbox.chatId}
            />
        );

    };

    const allInboxesComponent = useMemo(() => {
        if (pinnedInboxes.length < 1 && inboxes.length < 1) {
            return <SharedUi.NothingFoundView subject="inboxes" />;
        }

        const sortedPinned = [...pinnedInboxes].sort((a, b) => Date.parse(b.message.createdAt) - Date.parse(a.message.createdAt));
        const sortedInboxes = [...inboxes].sort((a, b) => Date.parse(b.message.createdAt) - Date.parse(a.message.createdAt));

        const pinnedInboxesItems = sortedPinned.map(processInbox)
        const inboxesListItems = sortedInboxes.map(processInbox);
        const intersectionBox = <Box ref={ref} h={0} w={0} />

        return (
            <Stack spacing={0}>
                {pinnedInboxesItems}
                {inboxesListItems}
                {intersectionBox}
            </Stack>
        );
    }, [inboxes, pinnedInboxes, currentChatId]);

    const matchedInboxesComponent = useMemo(() => {
        if (!isMatched) return <SharedUi.NothingFoundView subject={searchValue} />;

        return matchedInboxes.map(processInbox)
    }, [isMatched, matchedInboxes, currentChatId, items]);

    return searchValue ? matchedInboxesComponent : allInboxesComponent
};