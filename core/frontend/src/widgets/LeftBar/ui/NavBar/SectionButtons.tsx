import { Stack, StackProps } from "@mantine/core";
import { NavButton } from "./NavButton";
import { ILinks } from "../../mixtures/Links";
import { sections } from "../../types/Sections";
import { CenterLinks } from "../../mixtures/Links";

const stackProps: StackProps = {
    align: "center",
    justify: "space-between",
    w: "md",
    color: "red",
};

interface SectionButtonsProps {
    section: sections;
    setSection: (section:sections) => void;
}

export const SectionButtons: React.FC<SectionButtonsProps> = ({ section, setSection}) => (

    <Stack {...stackProps}>
        {CenterLinks.map((link) => (
            <NavButton
                key={link.section}
                title={link.section}
                Icon={link.Icon}
                active={link.section === section}
                onClick={() => setSection(link.section)}
            />
        ))}
    </Stack>
);