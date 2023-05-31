import React, { useState } from "react";
import { Stack, StackProps } from "@mantine/core";

import { NotificationsList } from "../../mixtures/Lists";
import { sections } from "../../types/Sections";
import { RenderedSection } from "./RenderedSection";
import { ContactsList, InboxesList } from "../../../../features";
import { CenterLoader } from "../../../../shared/ui";



interface IContentProps {
    section: sections;
}

const stackProps: StackProps = {
    w: "100%",
    h:'100%',
    spacing: 0,
};

export const SectionContent: React.FC<IContentProps> = ({ section }) => {
    const sectionComponents: Record<sections, React.FC> = {
        Chats: CenterLoader,
        Contacts: ContactsList,
    };

    const Sections = Object.entries(sectionComponents).map(([key, Component]) => (
        <RenderedSection key={key} component={Component} visible={section === key} />
    ))

    return (
        <Stack {...stackProps}>
            {Sections}
        </Stack>
    );
};
