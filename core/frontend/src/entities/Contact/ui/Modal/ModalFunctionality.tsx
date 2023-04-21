import React from "react";

import { Stack } from "@mantine/core";
import { IconMessageForward, IconSquarePlus } from "@tabler/icons-react";

import { ButtonTab } from "./Buttons/ButtonTab";
import { IContact } from "../../types/Model";
import { InteractionButton } from "./Buttons/InteractionButton";

interface IContactModalContentProps {
    contact: IContact;
}

const ModalFunctionality: React.FC<IContactModalContentProps> = ({
    contact,
}) => {
    
    const handleAddGroup = () => {
        //@TODO: Handle add group
    }


    const handleForward = () => {
        //@TODO:  handle forward to chat
    }

    return (
        <Stack spacing='0px' style={{ cursor: 'pointer' }}>
            <InteractionButton status={contact.status} contactId={contact.id}/>
            <ButtonTab Icon={IconSquarePlus} label='Add to group' onClick={() => { }} />
            <ButtonTab Icon={IconMessageForward} label="Forward to chat" onClick={() => { }} />
        </Stack>
    );
};

export default ModalFunctionality;
