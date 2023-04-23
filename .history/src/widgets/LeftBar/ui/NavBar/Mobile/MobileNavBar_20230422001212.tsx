import { sections } from "../../../types/Sections";
import { useUserStore } from "../../../../../entities";
import { Group } from "@mantine/core";
import { MainSectionsList } from "../MainSectionsList";

interface INavigationProps {
    section: sections;
    setSection: (section: sections) => void;
}


export const MobileNavBar: React.FC<INavigationProps> = ({ section, setSection }) => {
    const profile = useUserStore((state) => state.profile)

    return (
        <Group>
            <MainSectionsList section={section} setSection={setSection}/>
        </Group>
    );
};