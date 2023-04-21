import { Stack, StackProps } from "@mantine/core";
import { sections } from "../../../types/Sections";
import { MainSectionsList } from "../MainSectionsList";
import { ExtraSectionsList } from "../ExtraSectionsList";
import { UserAvatar } from "./UserAvatar";

const stackProps: StackProps = {
    align: "center",
    p: "0.5rem",
    bg: 'dark.8',
    justify: "space-between",
    py: 'sm',
};

const sectionLinkProps: StackProps = {
    align: "center",
    justify: "space-between",
    w: "md",
    color: "red",
};

interface IDesktopNavBarProps {
    section: sections;
    setSection: (section: sections) => void;
}

export const DesktopNavBar: React.FC<IDesktopNavBarProps> = ({ section, setSection }) => {

    const SectionStack = ({children}:any) => (
        <Stack {...sectionLinkProps}>
            {children}
        </Stack>
    )
    return (
        <Stack {...stackProps}>
            <UserAvatar />
            <SectionStack>
                <MainSectionsList section={section} setSection={setSection} />
            </SectionStack>
            <SectionStack>
                <ExtraSectionsList />
            </SectionStack>
        </Stack>
    );
};
