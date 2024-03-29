import { useState } from "react";

import { IContact } from "../..";
import { Contact } from "./Contact";
import { useContactInteractionStore } from "../store/ContactInteractionStore";
import { IUser } from "../../../shared/types";

interface IContactTabProps {
    contact: IContact | IUser
    onTabClick:() => void
}

export const ContactTab: React.FC<IContactTabProps> = ({ contact,onTabClick }) => {
    const [selected, setSelected] = useState<boolean>(false)
    const { openContactModal } = useContactInteractionStore.getState()

    const boxProps = {
        onMouseEnter: () => setSelected(true),
        onMouseLeave: () => setSelected(false),
        onClick: onTabClick,

        bg: selected ? 'dark.5' : 'initial',
        mx: '10px',
        py: '3px'
    }

    return (
        <Contact
            contact={contact}
            props={boxProps}
            avatarSize='md'
            activityLabelSize='xs'
            userNameSize='sm' />
    );
};
