import { sections } from "../../../types/Sections";
import { useUserStore } from "../../../../../entities";
import { Footer, FooterProps, Group, GroupProps } from "@mantine/core";
import { MainSectionsList } from "../MainSectionsList";


const groupProps: GroupProps = {
    align: 'center',
    style: { justifyContent: 'space-around' },
    px: 'md'
}

const fotterProps: Omit<FooterProps, 'children'> = {
    height: 65,
    bg: 'dark.8',
    pt: 'xs'
}

interface INavigationProps {
    section: sections;
    setSection: (section: sections) => void;
}


export const MobileNavBar: React.FC<INavigationProps> = ({ section, setSection }) => {
    const profile = useUserStore((state) => state.profile)

    return (
        <Footer {...fotterProps}>
            <Group {...groupProps}>
                <MainSectionsList section={section} setSection={setSection} isDesktop={false} />
            </Group>
        </Footer>

    );
};