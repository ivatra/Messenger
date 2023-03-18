import { Stack, StackProps } from "@mantine/core";
import { NavButton } from "./NavButton";
import { IconLogout, IconUserEdit } from "@tabler/icons-react";
import { useDrawer } from "../../hooks/EditUserContext";

const stackProps: StackProps = {
    align: "center",
    justify: "space-between",
    w: "md",
    color: "red",
};

export const FooterButtons = (): JSX.Element => {
    const { toggleDrawer} = useDrawer()

    const logout = () => {
    }

    const FooterLinks = [
        { Icon: IconUserEdit, section: "Edit User", onClick: toggleDrawer },
        { Icon: IconLogout, section: "Logout", onClick: logout }
    ];

    return (
        <Stack {...stackProps}>
            {
                FooterLinks.map((link) => (
                    <NavButton
                        key={link.section}
                        title={link.section}
                        Icon={link.Icon}
                        onClick={link.onClick}
                    />
                ))
            }
        </Stack >
    )
}