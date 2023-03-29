import { Paper } from "@mantine/core";
import { useInboxStore } from "../../../../entities";
import { InboxSkeleton } from "../../../../shared";
import ScrollableList from "../../../../shared/ui/Components/ScrollableList";
import { useInboxesList } from "../hooks/useInboxesList";
import useInboxesPagination from "../hooks/useInboxesPagination";
import { useMergedRef } from "@mantine/hooks";

export const InboxesList = () => {
    const { containerRef, observerRef, sizeRef } = useInboxesPagination()

    const mergedRef = useMergedRef(sizeRef, containerRef)

    const { isLoading } = useInboxStore();

    const inboxesList = useInboxesList({ ref: observerRef })

    return (
        <Paper display='flex' w='100%' ref={mergedRef}>
            <ScrollableList
                EntitiesList={inboxesList}
                Skeleton={InboxSkeleton}
                isLoading={isLoading} />
        </Paper>
    );
}
