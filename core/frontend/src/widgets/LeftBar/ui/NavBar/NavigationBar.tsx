import { Stack, StackProps } from "@mantine/core";
import { SectionButtons } from "./SectionButtons";
import { sections } from "../../types/Sections";
import { IProfile } from "../../../../entities";
import { FooterButtons } from "./FooterButtons";
import { UserAvatar } from "./UserAvatar";

const stackProps: StackProps = {
    justify: "space-between",
    align: "center",
    p: "0.5rem",
    bg: 'dark.8',
    py: 'sm'
};

interface INavigationProps {
    section: sections;
    profile: IProfile
    setSection: (section: sections) => void;
}


export const NavigationBar: React.FC<INavigationProps> = ({ section, setSection, profile }) => {

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