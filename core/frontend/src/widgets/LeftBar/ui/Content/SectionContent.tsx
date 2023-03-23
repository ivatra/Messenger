import { Stack, StackProps } from "@mantine/core"

import { Search } from "../../../../features/NavBar/Search/ui/Search"
import { ContactsList, NotificationsList } from "../../mixtures/Lists";
import { sections } from "../../types/Sections";
import InboxesList from "../../../../features/NavBar/InBoxesList";

const sectionComponents: Record<sections, React.FC> = {
    Chats: InboxesList,
    Contacts: ContactsList,
    Notifications: NotificationsList,
};

interface IContentProps{
    section:sections
}

const stackProps:StackProps = {
    p: 'xs',
    w: '100%',
    spacing: 0,
    align:"stretch"
}

export const SectionContent:React.FC<IContentProps> = ({section}) => {
    const SectionComponent = sectionComponents[section];
    return (
        <Stack {...stackProps}>
            <Search area={section} />
            <SectionComponent />
        </Stack>
    )
}