import { Box, Menu } from "@mantine/core";
import { IconDots, IconPin, IconPinnedOff, IconUser } from "@tabler/icons-react";
import { OptionItem } from "./OptionItem";


interface IOptionsProps {
    pinInbox: () => void;
    openContactView: () => void;
    isContactViewAvailable: boolean;
    isInboxPinned: boolean;
}

export const Options: React.FC<IOptionsProps> = ({ pinInbox, openContactView, isContactViewAvailable, isInboxPinned }) => {

    const onOpenProfile = async (e: any) => {
        e.stopPropagation();
        openContactView();
    }
    const onPinInbox = (e: any) => {
        e.stopPropagation();
        pinInbox();
    }

    const pinIcon = isInboxPinned ? IconPinnedOff : IconPin;
    const pinLabel = isInboxPinned ? "Unpin" : "Pin";

    return (
        <Box>
            <Menu trigger="hover" >
                <Menu.Target>
                    <IconDots size='1rem' />
                </Menu.Target>
                <Menu.Dropdown sx={{ padding: 0 }}>
                    <OptionItem
                        Icon={pinIcon}
                        onClick={onPinInbox}
                        size="0.7rem"
                        label={pinLabel} />
                    {isContactViewAvailable && <OptionItem
                        Icon={IconUser}
                        onClick={onOpenProfile}
                        size="0.7rem"
                        label="Open profile" />}
                </Menu.Dropdown>
            </Menu>
        </Box>
    );
}