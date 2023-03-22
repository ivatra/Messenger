import React, { useEffect } from 'react';
import { Drawer, Group, Stack } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { EditInputsList } from "./EditInputsList";

interface IEditUserProps {
    opened: boolean;
    closeDrawer: () => void;
}

const EditUserDrawer: React.FC<IEditUserProps> = ({ opened, closeDrawer }) => {
    const mediaQueryValue = useMediaQuery("(min-width: 38rem)");
    const [isLargeScreen, setIsLargeScreen] = React.useState<boolean | undefined>(mediaQueryValue);

    useEffect(() => {
        setIsLargeScreen(mediaQueryValue);
    }, [mediaQueryValue]);

    const drawerProps = {
        opened: opened,
        onClose: closeDrawer,
        withCloseButton: false,
        withOverlay: false,
        size: isLargeScreen ? "35%" : "100%"
    };

    return (
        <>
            {isLargeScreen !== undefined && (
                <Drawer {...drawerProps}>
                    <Group position="right">
                        <Drawer.CloseButton />
                    </Group>
                    <Stack>
                        <EditInputsList />
                    </Stack>
                </Drawer>
            )}
        </>
    );
};

export default EditUserDrawer;