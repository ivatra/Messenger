import { useState } from "react";
import { Paper, PaperProps } from "@mantine/core";

import { sections } from "../types/Sections";
import { SectionContent } from "./Content/SectionContent";
import { useDrawer } from "../hooks/EditUserContext";
import EditUserDrawer from "../../../entities/User/ui/EditUserDrawer";

const paperProps: PaperProps = {
    w: {
        "37rem": '100%',
        "38rem": '35%',
        md: '30%'
    },
    shadow: "sm",
    style: {
        borderColor: '',
        height: "100vh",
        overflow: "hidden",
    },
};

interface ISideBarProps {
    section: sections
}

export const SideBar: React.FC<ISideBarProps> = ({ section }) => {
    const { drawerOpen, toggleDrawer } = useDrawer();

    const drawer = drawerOpen && <EditUserDrawer opened={drawerOpen} closeDrawer={toggleDrawer} />

    const sectionContent = (
        <Paper {...paperProps}>
            <SectionContent section={section} />
        </Paper>
    )

    return (
        <>
            {drawer}
            {sectionContent}
        </>
    )
};

