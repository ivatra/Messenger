import { Drawer, Group, Stack } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { EditInputsList } from "./EditInputsList";

interface IEditUserProps {
    opened: boolean;
    closeDrawer: () => void;
}

export const EditUserDrawer: React.FC<IEditUserProps> = ({ opened, closeDrawer }) => {
    const isLargeScreen = useMediaQuery("(min-width: 38rem)");

    const drawerProps = {
        opened: opened,
        onClose: closeDrawer,
        withCloseButton: false,
        size: isLargeScreen ? "35%" : "100%"
    }


    return (
        <Drawer {...drawerProps}>
            <Group position="right">
                <Drawer.CloseButton />
            </Group>
            <Stack>
                <EditInputsList/>
            </Stack>
        </Drawer>
    );
};
