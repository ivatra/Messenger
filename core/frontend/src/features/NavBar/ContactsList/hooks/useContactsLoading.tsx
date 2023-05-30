import { useEffect } from "react";
import { useDidUpdate } from "@mantine/hooks";

import { useContactListStore } from "../../../../entities";

export const useContactsLoading = (
    scrollRef: React.RefObject<HTMLDivElement>,
    scrollPosition: number,
    limit: number
    ) => {
    const {
        isLoading,

        contactsHasMore,
        searchHasMore,

        filter,
        searchTerm,

        visibleContacts,
        contacts,
        searchedContacts,

        receiveByOffset: receiveContacts,
        receiveBySearchTerm: searchContacts
    } = useContactListStore()

    useEffect(() => {
        receiveContacts(limit)
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



