import { ActionIcon, Box, Menu, Stack } from "@mantine/core";
import { IconDots, IconPin, IconPinnedOff } from "@tabler/icons-react";
import { useState } from "react";


interface IOptionsProps {
    pinInbox: () => void
    isInboxPinned: boolean
}

export const Options: React.FC<IOptionsProps> = ({ pinInbox,isInboxPinned }) => {
    const handlePinClick = (e: any) => {
        e.stopPropagation()
        pinInbox()

    }

    const handleOpenProfileClick = (e:any) =>{
        e.stopPropagation()

    }

    const getPinItem = () => {
        const icon = isInboxPinned ? <IconPinnedOff size="1.2rem" /> : <IconPin size="1.2rem" />;
        const label = isInboxPinned ? "Unpin" : "Pin";

        return (
            <Menu.Item onClick={handlePinClick} icon={icon}>
                {label}
            </Menu.Item>
        );
    };

    // const openUserProfile = (
    //     <Menu.Item onClick = {handleOpenProfileClick} icon = {pinIcon}>
    //         'Open profile'
    //     </Menu.Item>
    // )

    const pinItem = getPinItem();
    //TODO:

    return (
        <Box >
            <Menu trigger="hover" >
                <Menu.Target>
                    <IconDots size='1rem' />
                </Menu.Target>
                <Menu.Dropdown sx={{ padding: 0 }}>
                    {pinItem}
                </Menu.Dropdown>
            </Menu>
        </Box>

    )
}
