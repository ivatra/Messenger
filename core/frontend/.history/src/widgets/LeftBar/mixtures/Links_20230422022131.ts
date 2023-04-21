import {
    IconAddressBook, IconBell, IconMessageCircle, TablerIconsProps
} from "@tabler/icons-react";
import { sections } from "../types/Sections";
import { TablerIcon } from "../../../shared";

export interface ILinks {
    Icon: TablerIcon
    section: sections
}

export const CenterLinks: ILinks[] = [
    { Icon: IconMessageCircle, section: "Chats" },
    { Icon: IconAddressBook, section: "Contacts" },
    { Icon: IconBell, section: "Notifications" },
];
