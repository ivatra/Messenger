import React from "react";

import { Stack } from "@mantine/core";
import { IconMessageForward, IconSquarePlus } from "@tabler/icons-react";

import { ButtonTab } from "./Buttons/ButtonTab";
import { IContact } from "../../types/Model";
import { InteractionButton } from "./Buttons/InteractionButton";
import { useChatStore } from "../../../Chat/types";
import { useNavigate } from "react-router-dom";
import { useContactInteractionStore } from "../../store/ContactInteractionStore";

interface IContactModalContentProps {
    contact: IContact;
}

const ModalFunctionality: React.FC<IContactModalContentProps> = ({
    contact,
}) => {
    const { receiveChatWithUser } = useChatStore()
    const { closeContactModal } = useContactInteractionStore()

    const navigate = useNavigate()
    
    const handleAddGroup = () => {
        //@TODO: Handle add group
    }


    const handleForward = async () => {
        const chatId = await receiveChatWithUser(contact.id)
        if (!chatId) return
        closeContactModal()
        navigate(`/chat/${chatId}`)
    }

    return (
        <Stack spacing='0px' style={{ cursor: 'pointer' }}>
            <InteractionButton status={contact.status} contactId={contact.id} />
            <ButtonTab Icon={IconSquarePlus} label='Add to group' onClick={() => { }} />
            <ButtonTab Icon={IconMessageForward} label="Forward to chat" onClick={handleForward} />
        </Stack>
    );
};

export default ModalFunctionality;
