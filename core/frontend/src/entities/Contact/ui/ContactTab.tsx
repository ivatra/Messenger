import { IContact } from "../..";
import { useState} from "react";
import { Contact } from "./Contact";
import { useContactInteractionStore } from "../store/ContactInteractionStore";

interface IContactTabProps {
    contact: IContact;
}

export const ContactTab: React.FC<IContactTabProps> = ({ contact }) => {
    const [selected, setSelected] = useState<boolean>(false)
    const {openContactModal} = useContactInteractionStore()

    const boxProps = {
        onMouseEnter: () => setSelected(true),
        onMouseLeave: () => setSelected(false),
        onClick: () => openContactModal(contact),
        
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
