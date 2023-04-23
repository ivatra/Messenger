import { useMantineTheme } from "@mantine/core";
import { CustomToolTip } from "../../../../../shared/ui/Components/CustomToolTip";
import { NavButton } from "../NavButton";
import { TablerIcon } from "../../../../../shared";

interface INavButtonProps {
    title: string;
    Icon: TablerIcon
    active?: boolean;
    onClick: () => void;
}

export const DesktopNavButton: React.FC<INavButtonProps> = ({
    title,
    Icon,
    active,
    onClick,
}) => {
    const theme = useMantineTheme();

    const iconProps = {
        size: "2rem",
        color: active ? theme.colors.blue[6] : 'white'
    }

    return (
        <CustomToolTip label={title}>
            <NavButton Icon={Icon} onClick={onClick} active={active} />
        </CustomToolTip>
    );
};