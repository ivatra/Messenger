import { useState } from "react";

import { AppShell, AppShellProps } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks";

import { SideBar, MobileNavBar, DesktopNavBar, sections, EditUserProvider } from "../../../widgets"


export const Content = () => {
    const [section, setSection] = useState<sections>("Chats");
    const isDesktop = useMediaQuery("(min-width: 992px)");

    const navBarProps = {
        section: section,
        setSection: setSection
    }

    const appShellProps:Omit<AppShellProps,'children'> = {
        padding: 0,
        style:{overflow:'hidden'},
        navbar: !isDesktop ? <DesktopNavBar {...navBarProps} /> : <></>,
        footer: !isDesktop ? <MobileNavBar {...navBarProps} /> : <></>
    }

    //  @TODO:fix scrollbar
    return (
        <EditUserProvider>
            <AppShell {...appShellProps}> 
                <SideBar section={section} />
            </AppShell>
        </EditUserProvider>
    )

}