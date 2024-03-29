import { Group, Paper, Stack } from "@mantine/core";
import { useDidUpdate, useMergedRef } from "@mantine/hooks";
import { useRef, useState } from "react";

import { useInboxesList } from "../hooks/useInboxesList";
import useInboxesPagination from "../hooks/useInboxesPagination";
import { GroupChatButton } from "./GroupChatButton";

import { useInboxStore } from "../../../../entities";
import { SharedUi } from "../../../../shared";



export const InboxesList = () => {
    const { containerRef, observerRef, sizeRef } = useInboxesPagination()

    const scrollViewPort = useRef<HTMLDivElement>(null);
    const mergedRef = useMergedRef(sizeRef, containerRef)
    const [searchValue, setSearchValue] = useState<string>('')

    const { isLoading, receiveMatched } = useInboxStore();
    const inboxesComponent = useInboxesList({ ref: observerRef, searchValue: searchValue })
    
    useDidUpdate(() => {
        if (searchValue) {
            receiveMatched(searchValue)
        };
    }, [searchValue]);

    return (
        (<Paper display='flex' ref={mergedRef} h='100%' w='100%' >
            <Stack spacing={0} w={'100%'}>
                <Group noWrap spacing={'0px'} mb={0}>
                    <SharedUi.Search
                        value={searchValue}
                        setValue={setSearchValue}
                        placeholder='Search for inboxes...' />
                    <GroupChatButton />
                </Group>
                <SharedUi.ScrollableList
                    scrollRef={scrollViewPort}
                    EntitiesList={inboxesComponent}
                    Skeleton={SharedUi.SideBarItemSkeleton}
                    isLoading={isLoading} />
            </Stack>
        </Paper>)
    );
}

