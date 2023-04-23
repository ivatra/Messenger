import { CenterLinks } from "../../mixtures/Links";
import { sections } from "../../types/Sections";
import { DesktopNavBar } from "./Desktop/DesktopNavBar";
import { MobileNavBar } from "./Mobile/MobileNavBar";
interface ISectionLinksProps {
    isDesktop: boolean
    section: sections
    setSection: (section: sections) => void
}

export const MainSectionsList = ({ section, setSection, isDesktop }: ISectionLinksProps) => (
    <>
        {CenterLinks.map((link) => {
            const navButtonProps = {
                key: link.section,
                title: link.section,
                Icon: link.Icon,
                active: link.section === section,
                onClick: () => setSection(link.section)
            }

            return (
                isDesktop
                    ? <DesktopNavButton {...navButtonProps} />
                    : <MobileNavButton {...navButtonProps} />
            )
        })}
    </>

)