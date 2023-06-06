import { useEffect, useState } from "react";

import { Group, Stack, Grid, Paper } from "@mantine/core";

import { ContactsList, ContactsSearchBar } from "../../../NavBar/ContactsList";

import { IContact, useContactListStore } from "../../../../entities";
import { SelectedContact } from "./SelectedContact";


interface ParticipantsModeProps {
    selectedContacts: IContact[]
    selectedColsC?:number
    setSelectedContacts: React.Dispatch<React.SetStateAction<IContact[]>>
}

const ParticipantsMode: React.FC<ParticipantsModeProps> = ({ selectedContacts, setSelectedContacts, selectedColsC = 4 }) => {
    const { visibleContacts } = useContactListStore();
    const [notSelectedContacts, setNotSelectedContacts] = useState<IContact[]>(visibleContacts)

    useEffect(() => {
        setNotSelectedContacts(visibleContacts.filter((contact) => !selectedContacts.includes(contact)))
    }, [selectedContacts, visibleContacts])

    const onContactTabClick = (contact: IContact) => {
        setSelectedContacts((prev) => [...prev, contact])
    }


    const removeSelectedContact = (contactId: string) => {
        setSelectedContacts((prev) => prev.filter((c) => c.id !== contactId))
    }

    return (
        <Paper>
            <Stack spacing={0} w="100%" display='flex' h='25rem'>
                <Grid columns={selectedColsC} justify="space-between">
                    {selectedContacts.map(contact => <SelectedContact
                        removeContact={() => removeSelectedContact(contact.id)}
                        key={contact.id}
                        contact={contact} span={1} />)}
                </Grid>
                <Group noWrap spacing="0px" mb={0}>
                    <ContactsSearchBar limit={15} />
                </Group>
                <ContactsList
                    onContactTabClick={onContactTabClick}
                    limit={15}
                    contacts={notSelectedContacts} />
            </Stack>
        </Paper>

    );
};

export default ParticipantsMode;
