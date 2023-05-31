import { useEffect } from "react";
import { useDidUpdate } from "@mantine/hooks";

import { IContact, useContactListStore } from "../../../../entities";

export const useContactsLoading = (
    scrollRef: React.RefObject<HTMLDivElement>,
    scrollPosition: number,
    contacts: IContact[],
    limit: number
) => {

    const { receiveByOffset } = useContactListStore()
    
    useEffect(() => {
        receiveByOffset(limit,contacts.length)
    }, [])

    useDidUpdate(() => {
        if (!scrollRef.current?.scrollHeight) return

        const scrollHeight = scrollRef.current.scrollHeight - scrollRef.current.clientHeight

        const hasReachedThreshold = scrollPosition > scrollHeight * 0.75

        if (hasReachedThreshold && !isLoading) {
            if (searchTerm && searchHasMore) searchContacts(limit);
            else if (!searchTerm && contactsHasMore) receiveContacts(limit);
        }

    }, [scrollPosition]);

    useDidUpdate(() => {
        const isTooFewFiltered = filter !== 'all' && visibleContacts.length < limit

        if (isTooFewFiltered && !isLoading) {
            if (searchTerm && searchHasMore) searchContacts(limit);
            else if (!searchTerm && contactsHasMore) receiveContacts(limit);
        }

    }, [searchedContacts, contacts, filter])
}

export default useContactsLoading;



