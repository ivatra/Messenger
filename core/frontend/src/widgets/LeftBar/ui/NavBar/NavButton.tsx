import { ActionIcon,Tooltip, TooltipProps } from "@mantine/core";
import { TablerIconsProps } from "@tabler/icons-react";

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

    const toolTipProps:TooltipProps = {
        children:'',
        label: title,
        position: "right-end",
        color: "dark.5",
        withArrow: true,
        arrowSize: 3,
        transitionProps: { transition: 'rotate-left', duration: 120 }
    }

    return (
        <Tooltip {...toolTipProps} style={{fontSize:'0.55rem'}}>
            <ActionIcon size='1.3rem' onClick={onClick}>
                <Icon  {...iconProps} />
            </ActionIcon>
        </Tooltip>
    );
};