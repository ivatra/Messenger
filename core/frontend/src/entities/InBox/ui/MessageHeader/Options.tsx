import { ActionIcon, Menu, Stack } from "@mantine/core";
import { IconDots, IconPin, IconPinnedOff } from "@tabler/icons-react";
import { useState } from "react";


interface IOptionsProps {
    pinInbox: () => void
    inboxPinned: boolean
}

export const Options: React.FC<IOptionsProps> = ({ pinInbox, inboxPinned }) => {

    const pinItem = inboxPinned
        ? <Menu.Item onClick={pinInbox} icon={<IconPinnedOff size='1.2rem' />}>Unpin</Menu.Item>
        : <Menu.Item onClick={pinInbox} icon={<IconPin size='1.2rem' />}>Pin</Menu.Item>

    return (
        <Menu trigger="hover">
            <Menu.Target>
                <IconDots size='1rem' />
            </Menu.Target>
            <Menu.Dropdown sx={{ padding: 0 }}>
                {pinItem}
            </Menu.Dropdown>
        </Menu>
    )
}
