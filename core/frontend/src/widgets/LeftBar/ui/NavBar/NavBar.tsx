import { Stack, StackProps } from "@mantine/core";
import { SectionButtons } from "./SectionButtons";
import { sections } from "../../types/Sections";
import { IProfile, useUserStore } from "../../../../entities";
import { FooterButtons } from "./FooterButtons";
import { UserAvatar } from "./UserAvatar";
import { useMediaQuery } from "@mantine/hooks";

const stackProps: StackProps = {
    align: "center",
    justify: "space-between",
    p: "0.5rem",
    bg: 'dark.8',
    py: 'sm',
};

interface INavigationProps {
    section: sections;
    setSection: (section: sections) => void;
}


export const NavBar: React.FC<INavigationProps> = ({ section, setSection }) => {
    const profile = useUserStore((state) => state.profile)
    
    return (
        <Stack {...stackProps}>
            <UserAvatar
                avatar={profile.avatar}
                name={profile.name}
                login={profile.name}
            />
            <SectionButtons
                section={section}
                setSection={setSection}
            />
            <FooterButtons />
        </Stack>
    );
};