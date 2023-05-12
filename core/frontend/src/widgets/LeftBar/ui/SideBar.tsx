import { MantineStyleSystemProps, Paper, PaperProps } from "@mantine/core";

import { sections } from "../types/Sections";
import { SectionContent } from "./Content/SectionContent";
import { useDrawer } from "../hooks/EditUserContext";
import {EditUserDrawer} from "../../../entities/User/ui/EditUserDrawer";
import { DESKTOP_WIDTH } from "../../../shared";
import React, { useEffect, useState } from "react";

const paperProps: PaperProps = {
    w: {
        "0rem": '100%',
        [`${DESKTOP_WIDTH}`]: '35%',
    },
    shadow: "sm",
    h:'100%',
    pos: 'sticky',
};

interface ISideBarProps {
    section: sections
    isDisplayed: boolean
}

export const SideBar: React.FC<ISideBarProps> = ({ section, isDisplayed }) => {
    const { drawerOpen, toggleDrawer } = useDrawer();
    
    const drawer = drawerOpen && <EditUserDrawer opened={drawerOpen} closeDrawer={toggleDrawer} />

    const sectionContent = (
        <Paper {...paperProps} display={isDisplayed ? 'block' : 'none'}>
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
