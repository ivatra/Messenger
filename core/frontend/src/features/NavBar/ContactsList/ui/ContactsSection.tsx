import { useState } from "react";

import { Group, Paper, Stack } from "@mantine/core";

import useContactsLoading from "../hooks/useContactsLoading";
import { ContactsSearchBar } from "./ContactsSearchBar";
import { useScrollOnTabSwitch } from "../hooks/useScrollOnTabSwitch";
import { useManageVisibleContacts } from "../hooks/useManageContacts";
import { ContactsList } from "./ContactsList";
import { FilterSelector } from "./FilterSelector";

import { IContact, useContactInteractionStore, useContactListStore } from "../../../../entities";
import { SharedHooks } from "../../../../shared";

const averageContactSize = 40


export const ContactsSection = () => {
    const { openContactModal } = useContactInteractionStore.getState()
    const { visibleContacts } = useContactListStore();

    const { limit, sizeRef } = SharedHooks.useDynamicLimit({ subjectSize: averageContactSize })

    const onContactTabClick = (contact: IContact) => {
        openContactModal(contact)
    }
    
    return (
        <Paper display='flex' ref={sizeRef} h='100%' w='100%'>
            <Stack spacing={0} w="100%" display='flex' >
                <Group noWrap spacing="0px" mb={0}>
                    <ContactsSearchBar limit={limit} />
                    <FilterSelector />
                </Group>
                <ContactsList onContactTabClick={onContactTabClick} limit={limit} contacts={visibleContacts}/>
            </Stack>
        </Paper >
    );
};