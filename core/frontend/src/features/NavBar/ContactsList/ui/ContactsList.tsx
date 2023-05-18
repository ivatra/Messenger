import { useState } from "react";

import { Paper, Stack } from "@mantine/core";

import useContactsLoading from "../hooks/useContactsLoading";

import { ContactsListHeader } from "./ContactsHeader";
import { useScrollOnTabSwitch } from "../hooks/useScrollOnTabSwitch";
import { SharedHooks } from "../../../../shared";
import { useManageVisibleContacts } from "../hooks/useManageContacts";
import { IContact } from "../../../../entities";
import { ContactTab } from "../../../../entities/Contact/ui/ContactTab";
import { ContactsBody } from "./ContactsBody";

const averageContactSize = 40


const contact: IContact = {
    id: "669b0195-f0a1-4c60-b040-8bb5d9b4be32",
    name: "Mandi",
    avatar: "defaultImage.jpg",
    login: "Mandi",
    isActive: false,
    lastSeen: '2023-03-24T16:46:11.316Z',
    status: 'pending'
}


export const ContactsList = (): JSX.Element => {
    const [scrollPosition, onScrollPositionChange] = useState({ x: 0, y: 0 });

    const { limit, sizeRef } = SharedHooks.useDynamicLimit({ subjectSize: averageContactSize })

    const scrollViewPort = useScrollOnTabSwitch()

    useContactsLoading(scrollViewPort, scrollPosition.y, limit)

    useManageVisibleContacts()

    return (
        <Paper display='flex' ref={sizeRef} h='100%' w='100%'>
            <Stack spacing={0} w="100%" display='flex' >
                <ContactsListHeader limit={limit} />
                <ContactsBody onScrollPositionChange={onScrollPositionChange} scrollRef={scrollViewPort} />
            </Stack>
        </Paper >
    );
};