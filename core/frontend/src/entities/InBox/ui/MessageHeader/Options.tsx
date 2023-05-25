import { Box, Menu } from "@mantine/core";
import { IconDots, IconPin, IconPinnedOff, IconUser } from "@tabler/icons-react";



interface IOptionsProps {
    pinInbox: () => void
    openContactView: () => void
    isContactViewAvaliable: boolean
    isInboxPinned: boolean
}

export const Options: React.FC<IOptionsProps> = ({ pinInbox, openContactView, isContactViewAvaliable, isInboxPinned }) => {

    const handlePinClick = (e: any) => {
        e.stopPropagation()
        pinInbox()

    }

    const handleOpenProfileClick = async (e: any) => {
        e.stopPropagation()
        openContactView()
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

    const openUserProfile = () => {
        const icon = isInboxPinned ? <IconUser size="1.2rem" /> : <IconPin size="1.2rem" />;
        return (
            <Menu.Item onClick={handleOpenProfileClick} icon={icon}>
                Open profile
            </Menu.Item>
        )
    }

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
                    {isContactViewAvaliable && openUserProfile()}
                </Menu.Dropdown>
            </Menu>
        </Box>

    )
}
