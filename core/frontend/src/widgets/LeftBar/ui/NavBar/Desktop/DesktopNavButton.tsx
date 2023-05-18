import { useMantineTheme } from "@mantine/core";

import { NavButton } from "../NavButton";

import { SharedUi, SharedTypes } from "../../../../../shared";

interface INavButtonProps {
    title: string;
    Icon: SharedTypes.ITablerIcon
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
        <SharedUi.CustomToolTip label={title}>
            <NavButton Icon={Icon} onClick={onClick} active={active} />
        </SharedUi.CustomToolTip>
    );
};