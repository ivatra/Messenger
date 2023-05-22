import {
    IconAddressBook, IconBell, IconMessageCircle
} from "@tabler/icons-react";
import { sections } from "../types/Sections";

import {SharedTypes} from "../../../shared";

export interface ILinks {
    Icon: SharedTypes.ITablerIcon
    section: sections
}

export const CenterLinks: ILinks[] = [
    { Icon: IconMessageCircle, section: "Chats" },
    { Icon: IconAddressBook, section: "Contacts" },
];
