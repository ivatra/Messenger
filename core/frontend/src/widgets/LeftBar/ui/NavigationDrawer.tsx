import { useMantineTheme, Drawer, MantineTheme, ModalBaseOverlayProps } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";

import IUser from '../../../entities'

interface IDrawer {
    opened: boolean;
    setOpened: Dispatch<SetStateAction<boolean>>;
}

const OverlayProps = (theme: MantineTheme): ModalBaseOverlayProps => {
    return {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
        opacity: 0.55,
        blur: 3,
    };
};



export const NavigationDrawer = ({ opened, setOpened }: IDrawer):JSX.Element => {
    const theme = useMantineTheme();
    return (
        <Drawer
            size='16rem'
            withCloseButton = {false}
            overlayProps={OverlayProps(theme)}
            position="left"
            opened={opened}
            onClose={() => setOpened(false)}
        >
            {/* Drawer content here */}
        </Drawer>
    );
};

const Header = (User:IUser) => {

}
