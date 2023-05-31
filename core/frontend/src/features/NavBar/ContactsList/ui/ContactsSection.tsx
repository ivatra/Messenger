import { useEffect, useMemo, useRef, useState } from "react";

import { Group, Paper, Stack } from "@mantine/core";
import { useDidUpdate } from "@mantine/hooks";

import { ContactsSearchBar } from "./ContactsSearchBar";
import { FilterSelector } from "./FilterSelector";

import { IContact, IContactFilters, IUser, useContactInteractionStore, useContactListStore, useUserStore } from "../../../../entities";
import { SharedHooks, SharedUi } from "../../../../shared";

const averageContactSize = 40

export const ContactsSection = () => {
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [filter, setFilter] = useState<IContactFilters>('all')

    const [searchedUsers, setSearchedUsers] = useState<IUser[]>([])
    const [visibleUsers, setVisibleUsers] = useState<IUser[]>([])
    const [fetchedContacts, setFetchedContacts] = useState<IContact[]>([])

    const contactsLen = useRef<number | null>(null)

    const [scrollPosition, onScrollPositionChange] = useState({ x: 0, y: 0 });
    const scrollViewPort = useRef<HTMLDivElement>(null);

    const { openModalWithUser } = useContactInteractionStore.getState()
    const { contacts, state, contactsTotalCount, receiveByOffset } = useContactListStore();
    const { receiveBySearchTerm, users, receiveById } = useUserStore()

    const { limit, sizeRef } = SharedHooks.useDynamicLimit({ subjectSize: averageContactSize })

    const onUserTabClick = (user: IUser) => {
        openModalWithUser(user.id)
    }


    useEffect(() => {
        setFetchedContacts(Object.values(contacts.byId))
    }, [contacts])

    const getUsersBySearch = () => {
        Promise.resolve(
            receiveBySearchTerm(searchTerm)).
            then((users) => users && setSearchedUsers(users))
    }

    // useDidUpdate(() => {
    //     if (filter === 'all') {
    //         setVisibleUsers(fetchedContacts)
    //     }else{
    //         setVisibleUsers(fetchedContacts.filter((user) => user.))
    //     }


        
    // }, [filter])

    useDidUpdate(() => {
        if (!scrollViewPort.current?.scrollHeight) return

        const scrollHeight = scrollViewPort.current.scrollHeight - scrollViewPort.current.clientHeight

        const hasReachedThreshold = scrollPosition.y > scrollHeight * 0.75

        if (hasReachedThreshold && state !== 'loading') {
            if (searchTerm) {
                getUsersBySearch()
            }
            else if (!contactsLen.current || !contactsTotalCount || contactsLen.current < contactsTotalCount) {
                receiveByOffset(limit, contactsLen.current || 0)
            }
        }

    }, [scrollPosition]);


    const ContactsComponent = useMemo(() => {
        return <></>
    }, [])


    return (
        <Paper display='flex' ref={sizeRef} h='100%' w='100%'>
            <Stack spacing={0} w="100%" display='flex' >
                <Group noWrap spacing="0px" mb={0}>
                    <ContactsSearchBar limit={limit} />
                    {!searchTerm && <FilterSelector />}
                </Group>
                <SharedUi.ScrollableList
                    EntitiesList={ContactsComponent}
                    Skeleton={SharedUi.SideBarItemSkeleton}
                    scrollRef={scrollViewPort}
                    isLoading={state === 'loading'}
                    onScrollPosChange={onScrollPositionChange}
                />
            </Stack>
        </Paper >
    );
};