import { useState } from "react";

import { Modal, Group, Stack } from "@mantine/core";

import AppearanceMode from "./ApperanceMode";
import ParticipantsMode from "./ParticipantsMode";
import { CC_Button } from "./CC.Button";

import { IContact, useChatStore } from "../../../../entities";

export const ChatCreation = () => {
    const { setGroupChatCreationOpened, isGroupChatCreationOpened, createGroupChat } = useChatStore();

    const [name, setName] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    const [creationMode, setCreationMode] = useState<"apperance" | "participants">("apperance");

    const [nameChoosen, setNameNotChoosen] = useState<boolean>(false)
    const [selectedContacts, setSelectedContacts] = useState<IContact[]>([]);

    const confirmCreation = () => {
        if(selectedContacts.length > 0){
            createGroupChat(selectedContacts, { avatar: file ? file : undefined, name: name })
        }
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
                    <CC_Button onClick={closeModal} title="Cancel" />
                    {creationMode === 'participants'
                        ?
                        <>
                            <CC_Button onClick={changeCreationMode} title="Back" />
                            <CC_Button onClick={confirmCreation} title="Confirm" />
                        </>
                        : <CC_Button onClick={changeCreationMode} title="Next" />
                    }
                </Group>
            </Stack>
        </Modal>
    );
};

