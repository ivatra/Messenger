import { ActionIcon, useMantineTheme } from "@mantine/core";
import { forwardRef } from "react";
import { SharedUi } from "../../../../shared";

interface INavButtonProps {
    Icon: TablerIcon
    active?: boolean;
    onClick: () => void;
}

export const NavButton = forwardRef<HTMLButtonElement, INavButtonProps>(({
    Icon,
    active,
    onClick,
}, ref) => {
    const theme = useMantineTheme();

    const iconProps = {
        size: "2rem",
        color: active ? theme.colors.blue[6] : 'white'
    }

    return (
        <ActionIcon ref={ref} size='md' onClick={onClick} component="button">
            <Icon {...iconProps} />
        </ActionIcon>
    );
});
