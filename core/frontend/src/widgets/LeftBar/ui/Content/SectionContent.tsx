import React from "react";
import { Stack, StackProps } from "@mantine/core";
import { Search } from "../../../../features/NavBar/Search/ui/Search";
import { ContactsList, NotificationsList } from "../../mixtures/Lists";
import { sections } from "../../types/Sections";
import InboxesList from "../../../../features/NavBar/InBoxesList";
import { RenderedSection } from "./RenderedSection";

const sectionComponents: Record<sections, React.FC> = {
    Chats: InboxesList,
    Contacts: ContactsList,
    Notifications: NotificationsList,
};

interface IContentProps {
    section: sections;
}

const stackProps: StackProps = {
    w: "100%",
    spacing: 0,
    align: "stretch",
};

export const SectionContent: React.FC<IContentProps> = ({ section }) => {

    const Sections = Object.entries(sectionComponents).map(([key, Component]) => (
        <RenderedSection key={key} component={Component} visible={section === key} />
    ))

    return (
        <Stack {...stackProps}>
            <Search area={section} />
            {Sections}
        </Stack>
    );
};
