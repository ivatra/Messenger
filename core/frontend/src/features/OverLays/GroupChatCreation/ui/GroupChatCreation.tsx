import { useState } from "react";

import { Modal, Group, Stack } from "@mantine/core";

import AppearanceMode from "./ApperanceMode";
import ParticipantsMode from "./ParticipantsMode";
import { GroupChatCreationButton } from "./GroupChatCreationButton";

import { IContact, useChatStore } from "../../../../entities";

export const GroupChatCreation = () => {
    const { setGroupChatCreationOpened, isGroupChatCreationOpened, createGroupChat } = useChatStore();

    const [name, setName] = useState<string>("");
    const [nameChoosen, setNameNotChoosen] = useState<boolean>(false)
    const [file, setFile] = useState<File | null>(null);
    const [selectedContacts, setSelectedContacts] = useState<IContact[]>([]);
    const [creationMode, setCreationMode] = useState<"apperance" | "participants">("apperance");

    const confirmCreation = () => {
        // createGroupChat(selectedContacts, { avatar: file ? file : undefined, name: name })
    }

    const changeCreationMode = () => {
        if (!name) {
            setNameNotChoosen(true)
        } else {
            setCreationMode((prev) => prev === 'apperance' ? 'participants' : 'apperance')
        }
    }

    const closeModal = () => {
        setGroupChatCreationOpened(false)
    }

    return (
        <Modal size='auto' onClose={closeModal} opened={isGroupChatCreationOpened} centered withCloseButton={false}>
            <Stack w='20rem' h='auto'>
                {creationMode === "apperance"
                    ? <AppearanceMode
                        isError={nameChoosen}
                        setError={setNameNotChoosen}
                        name={name}
                        setName={setName}
                        file={file}
                        setFile={setFile} />
                    : <ParticipantsMode selectedContacts={selectedContacts} setSelectedContacts={setSelectedContacts} />}
                <Group position="right" >
                    <GroupChatCreationButton onClick={closeModal} title="Cancel" />
                    {creationMode === 'participants'
                        ?
                        <>
                            <GroupChatCreationButton onClick={changeCreationMode} title="Back" />
                            <GroupChatCreationButton onClick={confirmCreation} title="Confirm" />
                        </>
                        : <GroupChatCreationButton onClick={changeCreationMode} title="Next" />
                    }
                </Group>
            </Stack>
        </Modal>
    );
};

