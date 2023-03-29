import { ActionIcon,Tooltip, useMantineTheme} from "@mantine/core";
import { TablerIconsProps } from "@tabler/icons-react";
import { CustomToolTip } from "../../../../shared/ui/Components/CustomToolTip";

interface INavButtonProps {
    title: string;
    Icon: (props: TablerIconsProps) => JSX.Element;
    active?: boolean;
    onClick: ()  => void;
}

export const NavButton: React.FC<INavButtonProps> = ({
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
        <CustomToolTip label = {title}>
            <ActionIcon size='md' onClick={onClick}>
                <Icon  {...iconProps} />
            </ActionIcon>
        </CustomToolTip>
    );
};