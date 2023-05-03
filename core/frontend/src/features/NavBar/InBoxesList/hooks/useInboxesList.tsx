import { useMemo } from "react";
import { Box, Stack } from "@mantine/core";
import { IInbox, Inbox, useChatStore, useInboxStore } from "../../../../entities";

interface IInboxesProps {
    ref: (element:
        any) => void
}


export const useInboxesList = ({ ref }: IInboxesProps) => {
    const { pinnedInboxes, inboxes, isMatched, matchedInboxes, isLoading } = useInboxStore();
    const { currentChatId } = useChatStore();

    const renderInbox = (inbox: IInbox) => (
        <Inbox
            key={inbox.id}
            inbox={inbox}
            active={currentChatId === inbox.chat.id}
        />
    );

    const pinnedInboxesList = useMemo(() => {
        return pinnedInboxes.map(renderInbox)
    }, [pinnedInboxes,currentChatId]);

    const inboxesList = useMemo(() => {
        const inboxesList = inboxes.map(renderInbox);
        return (
            <Stack spacing={0}>
                {pinnedInboxesList}
                {inboxesList}
                <Box ref={ref} h={0} w={0} />
            </Stack>
        );
    }, [inboxes, pinnedInboxesList]);

    const matchedInboxesComponent = useMemo(() => {
        if (!isMatched) return <></>;

        return (
            <Stack spacing={0}>
                {matchedInboxes.map(renderInbox)}
            </Stack>
        );
    }, [isMatched, matchedInboxes, isLoading, currentChatId]);

    return { inboxesListComponent: inboxesList, matchedInboxesComponent };
};
