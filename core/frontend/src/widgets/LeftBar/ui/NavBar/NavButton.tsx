import { ActionIcon,Tooltip} from "@mantine/core";
import { TablerIconsProps } from "@tabler/icons-react";
import { CustomToolTip } from "../../../../shared/ui/CustomToolTip";

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

    const iconProps = {
        size: "1rem",
        color: active ? '#1864ab' : 'white'
    }

    return (
        <CustomToolTip label = {title}>
            <ActionIcon size='1.3rem' onClick={onClick}>
                <Icon  {...iconProps} />
            </ActionIcon>
        </CustomToolTip>
    );
};