import { Stack } from "@mantine/core"
import { Search } from "../../../../features/NavBar/Search/ui/Search"
import { ChatsList, ContactsList, NotificationsList } from "../../mixtures/Lists";
import { sections } from "../../types/Sections";

const sectionComponents: Record<sections, React.FC> = {
    Chats: ChatsList,
    Contacts: ContactsList,
    Notifications: NotificationsList,
};


interface IContentProps{
    section:sections
}

export const SectionContent:React.FC<IContentProps> = ({section}) => {
    const SectionComponent = sectionComponents[section];
    return (
        <Stack p={'xs'} w={'100%'} spacing={0} align="stretch">
            <Search />
            <SectionComponent />
        </Stack>
    )
}