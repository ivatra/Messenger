import { Text, Stack, useMantineTheme } from "@mantine/core";
import { TablerIconsProps } from "@tabler/icons-react";
import { NavButton } from "../NavButton";
import { TablerIcon } from "../../../../../shared";

interface INavButtonProps {
    title: string;
    Icon: TablerIcon
    active?: boolean;
    onClick: () => void;
}

export const MobileNavButton: React.FC<INavButtonProps> = ({
    title,
    Icon,
    active,
    onClick,
}) => {

    return (
        <Stack m={0} p={0} justify="center" align="center" spacing={0}>
            <NavButton Icon={Icon} onClick={onClick} active={active} />
            <Text color = {active ? 'blue' : 'initial'} size='0.7rem'>{title}</Text>
        </Stack>
    );
};