
import { IconLogout, IconUserEdit } from "@tabler/icons-react";
import { DesktopNavButton } from "./Desktop/DesktopNavButton";
import { useDrawer } from "../../hooks/EditUserContext";


export const ExtraSectionsList = (): JSX.Element => {
    const { toggleDrawer } = useDrawer()

    const logout = () => {
    }

    const ExtraLinks = [
        { Icon: IconUserEdit, section: "Edit User", onClick: toggleDrawer },
        { Icon: IconLogout, section: "Logout", onClick: logout }
    ];

    return (
        <>
            {ExtraLinks.map((link) => (
                <DesktopNavButton
                    key={link.section}
                    title={link.section}
                    Icon={link.Icon}
                    onClick={link.onClick}
                />
            ))}
        </>
    )
}