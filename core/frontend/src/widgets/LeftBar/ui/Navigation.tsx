import { Avatar, Stack } from "@mantine/core";

import { IconAddressBook, IconBell, IconLogout, IconMessages } from "@tabler/icons-react"
import { ToolTips } from "./ToolTips";
import { IToolTip } from "./ToolTip";

export const avatarUrl = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"

const CenterLinks: IToolTip[] = [
    { Icon: IconMessages, title: 'Chats' },
    { Icon: IconAddressBook, title: 'Contacts' },
    { Icon: IconBell, title: 'Notifications' }
];

const FooterLinks: IToolTip[] = [
    { Icon: IconLogout, title: 'Logout' },
]

export const Navigation = (): JSX.Element => {
    return (
        <Stack spacing="sm" justify="space-between" align="center">
            <Avatar size={'sm'} radius='lg' src={avatarUrl} />
            <ToolTips Links={CenterLinks} />
            <ToolTips Links={FooterLinks} />
        </Stack>
    );
};
