import { Group, Paper, Stack } from "@mantine/core";
import { useDebouncedState, useDidUpdate, useMergedRef } from "@mantine/hooks";
import { useMemo, useRef } from "react";

import { useInboxesList } from "../hooks/useInboxesList";
import useInboxesPagination from "../hooks/useInboxesPagination";
import { GroupChatButton } from "./GroupChatButton";

import { Inbox, useInboxStore } from "../../../../entities";
import { SideBarItemSkeleton, ScrollableList, NothingFoundView, Search } from "../../../../shared";


//TODO: handle if inboxes is empty

export const InboxesList = () => {
    const { containerRef, observerRef, sizeRef } = useInboxesPagination()
    const { isLoading, isMatched, receiveMatched } = useInboxStore();
    const { inboxesListComponent, matchedInboxesComponent } = useInboxesList({ ref: observerRef })

    const scrollViewPort = useRef<HTMLDivElement>(null);
    const mergedRef = useMergedRef(sizeRef, containerRef)
    const [searchValue, setSearchValue] = useDebouncedState<string>('', 100)


    useDidUpdate(() => {
        searchValue !== '' && receiveMatched(searchValue);
    }, [searchValue]);


    var inboxesComponent: any = []

    if (searchValue !== '') {
        if (!isMatched && !isLoading) inboxesComponent = (<NothingFoundView searchValue={searchValue} />)
        else inboxesComponent = matchedInboxesComponent
    }
    else inboxesComponent = inboxesListComponent

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

