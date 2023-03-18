import { Avatar, Stack, StackProps } from "@mantine/core";
import { SectionButtons } from "./SectionButtons";
import { sections } from "../../types/Sections";
import { IProfile } from "../../../../entities";
import { FooterButtons } from "./FooterButtons";

const stackProps: StackProps = {
    justify: "space-between",
    align: "center",
    p: "0.5rem",
    bg: 'dark.8'
};

interface INavigationProps {
    section: sections;
    profile: IProfile
    setSection: (section: sections) => void;
}

export const NavigationBar: React.FC<INavigationProps> = ({section,setSection,profile}) => {

    // TODO: Popover on avatar where gonna be login,name
    // TODO: Add manage profile above logout user-cog 
    return (
        <Stack {...stackProps} py='sm'>
            <Avatar size={"1.3rem"} radius="lg" src={profile.avatar} />
            <SectionButtons section={section} setSection={setSection} />
            <FooterButtons/> 
        </Stack>
    );
};