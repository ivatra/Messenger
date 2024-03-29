import { useEffect, useRef, useState } from "react";
import { useDidUpdate, useIntersection } from "@mantine/hooks";

import { useInboxStore } from "../../../../entities";
import { SharedHooks } from "../../../../shared";

const averageInboxSize = 50

const useInboxesPagination = () => {
    const [page, setPage] = useState<number>(1);
    const containerRef = useRef<HTMLDivElement>(null);

    const { ref: observerRef, entry } = useIntersection({
        root: containerRef.current,
    })

    const { receive, receivePinned, inboxesTotalCount, inboxes } = useInboxStore()
    const { limit, sizeRef } = SharedHooks.useDynamicLimit({ subjectSize: averageInboxSize })
   

    useEffect(() => {
        if (inboxes.length < inboxesTotalCount || !inboxesTotalCount){
            page === 1 && receivePinned()
            receive(limit)
        }
    }, [page])


    useDidUpdate(() => {
        if (!entry?.isIntersecting || inboxes.length >= inboxesTotalCount - 1) return
        setPage((p) => p + 1)
    }, [entry?.isIntersecting])

    return {
        containerRef,
        observerRef,
        sizeRef
    }

}

export default useInboxesPagination;



