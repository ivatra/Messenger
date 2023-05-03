import React from "react";
import { useState } from "react";

import { useMediaQuery } from "@mantine/hooks";
import { AppShell, AppShellProps, Group, Loader } from "@mantine/core";


import {  MobileNavBar, DesktopNavBar, sections, ChatView, EditUserProvider, SideBar } from "../../../widgets";

import { DESKTOP_WIDTH } from "../../../shared";



export const ChattingContent = () => {
    const [section, setSection] = useState<sections>("Chats");
    
    const isDesktop = useMediaQuery(`(min-width: ${DESKTOP_WIDTH})`);

    if (isDesktop === undefined) return <Loader />

    const navBarProps = {
        section: section,
        setSection: setSection
    }

    const appShellProps: Omit<AppShellProps, 'children'> = {
        padding: 0,
        navbar: isDesktop ? <DesktopNavBar {...navBarProps} /> : undefined,
        footer: !isDesktop ? <MobileNavBar {...navBarProps} /> : undefined
    }

    return (
        <EditUserProvider>
            <AppShell {...appShellProps} >
                <Group noWrap h='100%'>
                    <SideBar section={section} />
                    {isDesktop && <ChatView />}
                </Group>
            </AppShell>
        </EditUserProvider>
    )
}

export const MemoziedChattingPage = React.memo(ChattingContent)