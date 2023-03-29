import { Paper } from "@mantine/core";
import { useInboxStore } from "../../../../entities";
import { InboxSkeleton } from "../../../../shared";
import SectionList from "./SectionList";
import { useInboxesList } from "../hooks/useInboxesList";
import useInboxesPagination from "../hooks/useInboxesPagination";
import { useElementSize, useMergedRef } from "@mantine/hooks";

export const InboxesList = () => {
    const { containerRef, observerRef, sizeRef } = useInboxesPagination()

    const mergedRef = useMergedRef(sizeRef, containerRef)

    const { isLoading } = useInboxStore();

    const inboxesList = useInboxesList({ ref: observerRef })

    return (
        <Paper display='flex' w='100%' ref={mergedRef}>
            <SectionList
                EntitiesList={inboxesList}
                Skeleton={InboxSkeleton}
                isLoading={isLoading} />
        </Paper>
    );
}
