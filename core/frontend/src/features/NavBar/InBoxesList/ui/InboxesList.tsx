import { Paper } from "@mantine/core";
import { useMergedRef } from "@mantine/hooks";

import { useInboxStore } from "../../../../entities";
import { InboxSkeleton, ScrollableList } from "../../../../shared";

import { useInboxesList } from "../hooks/useInboxesList";
import useInboxesPagination from "../hooks/useInboxesPagination";


export const InboxesList = () => {
    const { containerRef, observerRef, sizeRef } = useInboxesPagination()

    const mergedRef = useMergedRef(sizeRef, containerRef)

    const isLoading = useInboxStore(state => state.isLoading);

    const inboxesList = useInboxesList({ ref: observerRef })

    return (
        <Paper ref={mergedRef}>
            <ScrollableList
                EntitiesList={inboxesList}
                Skeleton={InboxSkeleton}
                isLoading={isLoading} />
        </Paper>
    );
}
