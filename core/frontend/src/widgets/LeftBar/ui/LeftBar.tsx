import { Group, GroupProps, Navbar, NavbarProps } from "@mantine/core";
import { useState } from "react";

import { NavigationBar } from "./NavBar/NavigationBar";
import { profile } from "../mixtures/User";
import { sections } from "../types/Sections";
import { SectionContent } from "./Content/SectionContent";
import { useDrawer } from "../hooks/EditUserContext";
import EditUserDrawer from "../../../entities/User/ui/EditUserDrawer";
import { useUserStore } from "../../../entities";


const navBarWidth = '38rem'

const navbarProps: NavbarProps = {
    children: '',
    hiddenBreakpoint: '38rem',
    display: 'flex',
    w: { navBarWidth: '35%', md: '30%' },
    bg: 'dark.7'
}

const groupProps: GroupProps = {
    w: '100%',
    noWrap: true,
    align: "inherit",
    spacing: 0
}

export const LeftBar = () => {
    const [section, setSection] = useState<sections>('Chats')
    // const profile = useUserStore(state => state.profile)
    const { drawerOpen, toggleDrawer } = useDrawer()

    return (
        drawerOpen
            ?
            <EditUserDrawer
                opened={drawerOpen}
                closeDrawer={toggleDrawer}
                width={navBarWidth}
            />
            :
            <Navbar {...navbarProps}>
                <Navbar.Section grow display={'flex'}>
                    <Group {...groupProps}>
                        <NavigationBar
                            profile={profile}
                            section={section}
                            setSection={setSection}
                        />
                        <SectionContent
                            section={section}
                        />
                    </Group>
                </Navbar.Section>
            </Navbar>
    )
}
