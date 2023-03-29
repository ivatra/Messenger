import { useMemo } from "react";
import { Box, Stack } from "@mantine/core";
import { Inbox, useInboxStore } from "../../../../entities";

interface IInboxesProps {
    ref: (element:
         any) => void
    props?: any
}


export const useInboxesList = ({ ref, props }: IInboxesProps) => {
    const { pinnedInboxes, inboxes } = useInboxStore()

    const pinnedInboxesList = useMemo(() => (
        pinnedInboxes.map((inbox) => <Inbox key={inbox.id} inbox={inbox} {...props} />)
    ), [pinnedInboxes]);


    const inboxesList = useMemo(() => {
        const inboxesList = inboxes.map((inbox) => <Inbox key={inbox.id} inbox={inbox} {...props} />);
        return (
            <Stack spacing={0}>
                {pinnedInboxesList}
                {inboxesList}
                <Box ref={ref} h={0} w={0} />
            </Stack>
        );
    }, [inboxes, pinnedInboxesList]);

    return inboxesList
}
