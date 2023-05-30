import { Stack } from "@mantine/core"
import { IconExclamationCircle } from "@tabler/icons-react"

import { TextTab } from "./Buttons/TextTab"
import { Contact } from "../Contact"
import { IContact } from "../../types/ContactModel"
import { StatusText } from "./Buttons/StatusText"


interface IModalInformationProps {
    contact: IContact
}

export const ModalInformation: React.FC<IModalInformationProps> = ({ contact }) => {

    const loginTabProps = {
        content: `@${contact.login}`,
        label: 'Userlogin',
        Icon: IconExclamationCircle
    }

    return (
        <Stack spacing={'md'}>
            <Contact contact={contact} avatarSize='4.5rem' activityLabelSize={'sm'} userNameSize={'md'} />
            <TextTab {...loginTabProps} />
            <StatusText status={contact.status} />
        </Stack>
    )
}