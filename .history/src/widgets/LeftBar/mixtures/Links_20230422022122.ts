import {
    IconAddressBook, IconBell, IconMessages, TablerIconsProps
} from "@tabler/icons-react";
import { sections } from "../types/Sections";

export interface ILinks{
    Icon: (props: TablerIconsProps) => JSX.Element
    section:sections
}

export const CenterLinks:ILinks[] = [
    { Icon: IconMessages, section: "Chats" },
    { Icon: IconAddressBook, section: "Contacts" },
    { Icon: IconBell, section: "Notifications" },
];
