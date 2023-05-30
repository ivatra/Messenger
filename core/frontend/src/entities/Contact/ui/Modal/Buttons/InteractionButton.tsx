import React, { useEffect, useState } from "react";

import { Loader } from "@mantine/core";

import { IconLoader } from "@tabler/icons-react";

import { ButtonTab } from "./ButtonTab";
import { useContactInteractionStore } from "../../../store/ContactInteractionStore";
import { IContactStatus } from "../../../types/ContactModel";
import { getInteractionByStatus } from "../../../helpers/getInteractionByStatus";

import { SharedTypes } from "../../../../../shared";


interface IButtonTabLogicProps {
    status:IContactStatus
    contactId:string
}

export const InteractionButton: React.FC<IButtonTabLogicProps> = ({ status, contactId }) => {
    const {
        addContact,
        acceptContact,
        removeContact,
        isLoading,
    } = useContactInteractionStore();


    const [label,setLabel] = useState<string>('')
    const [Icon,setIcon] = useState<SharedTypes.ITablerIcon>(IconLoader)

    useEffect(()=>{
        const { label, Icon } = getInteractionByStatus(status);

        setLabel(label)
        setIcon(Icon)
    }, [status])

    const handleInteraction = async() => {
        if (status === "accepted" || status === 'outgoing') removeContact(contactId);
        else if (status === "pending") acceptContact(contactId);
        else if (status === null) addContact(contactId);
        else throw new Error("Unexpected status: " + status);
    };

    const feedBackLoader = isLoading ? <Loader size="sm" /> : <></>;

    return (
        <ButtonTab
            Icon={Icon}
            label={label}
            feedbackIndicator={feedBackLoader}
            onClick={handleInteraction}
        />
    );
};
