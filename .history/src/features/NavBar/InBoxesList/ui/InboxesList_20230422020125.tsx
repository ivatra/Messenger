import { Group, Paper, Stack } from "@mantine/core";
import { useDebouncedState, useDidUpdate, useMergedRef } from "@mantine/hooks";
import { useMemo, useRef } from "react";

import { useInboxesList } from "../hooks/useInboxesList";
import useInboxesPagination from "../hooks/useInboxesPagination";
import { GroupChatButton } from "./GroupChatButton";

import { Inbox, useInboxStore } from "../../../../entities";
import { SideBarItemSkeleton, ScrollableList, NothingFoundView, Search } from "../../../../shared";

export const InboxesList = () => {
    const { containerRef, observerRef, sizeRef } = useInboxesPagination()
    const { isLoading, matchedInboxes, isMatched, receiveMatched } = useInboxStore();
    const inboxesList = useInboxesList({ ref: observerRef })

    const scrollViewPort = useRef<HTMLDivElement>(null);
    const mergedRef = useMergedRef(sizeRef, containerRef)
    const [searchValue, setSearchValue] = useDebouncedState<string>('', 100)


    useDidUpdate(() => {
        searchValue !== '' && receiveMatched(searchValue);
    }, [searchValue]);

    const matchedInboxesComponent = useMemo(() => {
        if (!isMatched) return <></>;
        return (
            <Stack spacing={0}>
                {matchedInboxes.map((inbox) => (
                    <Inbox key={inbox.id} inbox={inbox} />))}
            </Stack>
        );
    }, [isMatched, matchedInboxes, isLoading]);

    var inboxesComponent: any = []

    if (searchValue !== '') {
        if (!isMatched && !isLoading) inboxesComponent = (<NothingFoundView searchValue={searchValue} />)
        else inboxesComponent = matchedInboxesComponent
    }
    else inboxesComponent = inboxesList

    return (
        <Paper display='flex' ref={mergedRef} h='100%' w='100%' >
            <Stack spacing={0} w={'100%'}>
                <Group noWrap spacing={'0px'} mb={0}>
                    <Search
                        value={searchValue}
                        setValue={setSearchValue}
                        placeHolder='Write something...' />
                    <GroupChatButton />
                </Group>
                <ScrollableList
                    scrollRef={scrollViewPort}
                    EntitiesList={inboxesComponent}
                    Skeleton={SideBarItemSkeleton}
                    isLoading={isLoading} />
            </Stack>
        </Paper>
    );
}

