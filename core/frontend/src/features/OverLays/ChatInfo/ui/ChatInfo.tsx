import { Group, Text, Modal, Stack, ScrollArea, Box, Center, ActionIcon, Button, Tabs } from "@mantine/core"
import { Contact, ContactTab, IContact, useChatStore, useContactListStore, useUserStore } from "../../../../entities"
import { useCallback, useEffect, useState } from "react"
import { SharedHelpers, SharedTypes } from "../../../../shared"
import { CustomAvatar } from "../../../../shared/ui"
import { useElementSize } from "@mantine/hooks"
import { IconMinus, IconPlus } from "@tabler/icons-react"
import { ContactsList, ContactsSearchBar } from "../../../NavBar/ContactsList"
import ParticipantsMode from "../../ChatCreation/ui/ParticipantsMode"




interface IProps {
    opened: boolean
    closeModal: () => void
    selectedContacts: IContact[]
    setSelectedContacts: React.Dispatch<React.SetStateAction<IContact[]>>

}

const ParticipantsSelection = ({ closeModal, opened, selectedContacts, setSelectedContacts }: IProps) => {

    return (
        <Modal opened={opened} onClose={closeModal} centered >
            <Stack align='center'>
                <ParticipantsMode selectedContacts={selectedContacts} setSelectedContacts={setSelectedContacts} />
                <Button type='submit' variant='light'>Submit</Button>
            </Stack>
        </Modal>
    )
}

interface IParticipantListProps {
    participants: SharedTypes.IChatParticipant[];
    onRemoveParticipant: (partId: number) => void;
    role:'ADMIN' | 'USER'
}

const ParticipantList = ({ participants, onRemoveParticipant,role }: IParticipantListProps) => {
    return (
        <ScrollArea display='flex' h='350px' w='100%' m  = 'sm' offsetScrollbars>
            <Stack spacing={'0.5rem'} >
                {participants.map((part, i) => (
                    <Group key={part.id} position="apart">
                        <Contact
                            contact={part.user}
                            avatarSize='md'
                            activityLabelSize='xs'
                            userNameSize='sm' />
                            {role === 'ADMIN' && 
                            <ActionIcon c='red.6' onClick={() => onRemoveParticipant(part.id)}>
                                <IconMinus />
                            </ActionIcon>
                            }
                      
                    </Group>
                ))}
            </Stack>
        </ScrollArea>
    )
}

export const ChatInfo = () => {
    const { isChatInfoOpened, setChatInfoOpened, currentChatId, chats, addParticipant, removeParticipant } = useChatStore()


    const {visibleContacts} = useContactListStore()
    const [notChoosenContacts, setNotChoosenContacts] = useState<IContact[]>(visibleContacts)
    const [activeTab, setActiveTab] = useState<string>('current');

    const currentChat = chats[currentChatId]
    const currentUserId = useUserStore().profile.id
    useEffect(() => {
        setNotChoosenContacts(
            visibleContacts.filter(
                (contact) => !currentChat.participants.some((participant) => participant.user.id === contact.id)
            )
        );
    }, [currentChat,visibleContacts])

    if (!currentChat || currentChat.type !== 'group') {
        setChatInfoOpened(false)
        return <></>
    }

    const onRemoveParticipant = (partId: number) => {
        removeParticipant(currentChatId, partId)
    }

    const onAddParticipant = (userId: string) => {
        addParticipant(currentChatId, userId)

    }


    return (
        <>
            <Modal opened={isChatInfoOpened} onClose={() => setChatInfoOpened(false)} centered styles={{
                close: {
                    justifySelf: 'right'
                }, content: {
                    overflow: 'hidden'
                }
            }} size = 'xs' style = {{maxHeight:'70%'}}>
                <Stack align='center' w='100%' mah='70%'>
                    <Group>
                        <CustomAvatar avatarSrc={currentChat.groupChat.avatar} size='xl' />
                        <Text>{currentChat.groupChat.name}</Text>
                    </Group>
                    <Text>{currentChat.participants.length} participants in chat</Text>
                    <Tabs value={activeTab} onTabChange={(v: string) => setActiveTab(v)} >
                        <Tabs.List>
                            <Tabs.Tab value="current">Current participants</Tabs.Tab>
                            {currentChat.groupChat.role === 'ADMIN' &&<Tabs.Tab value="new">Choose new</Tabs.Tab>}
                        </Tabs.List>
                        <Tabs.Panel value="current">  <ParticipantList
                            participants={currentChat.participants.filter((part) => part.user.id !== currentUserId)}
                            onRemoveParticipant={onRemoveParticipant}
                            role = {currentChat.groupChat.role}
                        /></Tabs.Panel>
                        <Tabs.Panel value="new"  > 
                            <Stack m='sm' h='350px' >
                                <Group noWrap spacing="0px" mb={0}>
                                    <ContactsSearchBar limit={15} />
                                </Group>
                                <ContactsList
                                    onContactTabClick={(c) => onAddParticipant(c.id)}
                                    limit={15}
                                    contacts={notChoosenContacts} />
                            </Stack>
                        </Tabs.Panel>
                    </Tabs>
                </Stack>
            </Modal>
        </>

    )
}