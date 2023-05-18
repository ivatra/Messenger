import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { useMediaQuery } from "@mantine/hooks";
import { AppShell, AppShellProps, Group } from "@mantine/core";


import { MobileNavBar, DesktopNavBar, sections, ChatView, EditUserProvider, SideBar } from "../../../widgets";
import { useChatStore } from "../../../entities";
import { SharedUi, SharedConsts } from "../../../shared";


export const ChattingContent = () => {
    const [section, setSection] = useState<sections>("Chats");
    const { chatId } = useParams()

    const isDesktop = useMediaQuery(`(min-width: ${SharedConsts.DESKTOP_WIDTH})`);

    const { setCurrentChatId } = useChatStore()

    useEffect(() => {
        setCurrentChatId(chatId ? +chatId : undefined)
    }, [chatId])

    const navBarProps = {
        section: section,
        setSection: setSection
    }

    const appShellProps: Omit<AppShellProps, 'children'> = {
        padding: 0,
        navbar: isDesktop ? <DesktopNavBar {...navBarProps} /> : undefined,
        footer: isDesktop === false && !chatId ? <MobileNavBar {...navBarProps} /> : undefined
    }

    const body = useMemo(() => {
        if (isDesktop === undefined) {
            return <SharedUi.CenterLoader />;
        }

        const sideBarVisible = isDesktop || !chatId
        const chatViewVisible = Boolean(isDesktop || chatId);

        return (
            <>
                <SideBar section={section} isDisplayed={sideBarVisible} />
                <ChatView chatId={chatId ? +chatId : undefined} isDisplayed={chatViewVisible} />
            </>
        );
    }, [chatId, isDesktop, section]);

    return (
        <EditUserProvider>
            <AppShell {...appShellProps}>
                <Group noWrap mah = '100vh' h = '100vh'>
                    {body}
                </Group>
            </AppShell>
        </EditUserProvider>
    )
}

export const MemoziedChattingPage = React.memo(ChattingContent)