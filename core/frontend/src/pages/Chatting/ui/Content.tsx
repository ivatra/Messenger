import { useState } from "react";

import { AppShell } from "@mantine/core"

import { SideBar, NavigationBar, sections } from "../../../widgets"


export const Content = () => {
    const [section, setSection] = useState<sections>("Chats");
    return (
        <>
            <NavigationBar
                section={section}
                setSection={setSection} />
            <SideBar section={section} />
            // ChatView
        </>
    )

}