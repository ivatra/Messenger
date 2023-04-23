import { CenterLinks } from "../../mixtures/Links";
import { sections } from "../../types/Sections";
import { NavButton } from "./NavButton";


interface ISectionLinksProps {
    section: sections
    setSection: (section: sections) => void
}

export const MainSectionsList = ({ section, setSection }: ISectionLinksProps) => (
    <>
        {CenterLinks.map((link) => (
            <NavButton
                key={link.section}
                title={link.section}
                Icon={link.Icon}
                active={link.section === section}
                onClick={() => setSection(link.section)}
            />
        ))}
    </>

)