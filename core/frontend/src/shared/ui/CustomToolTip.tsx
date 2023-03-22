import { Tooltip, TooltipProps } from "@mantine/core";

interface INavButtonProps {
    label: string | React.ReactNode;
    children:React.ReactNode
}

export const CustomToolTip: React.FC<INavButtonProps> = ({
    label,
    children
}) => {

    const toolTipProps:TooltipProps = {
        children:'',
        label: label,
        position: "right-end",
        color: "dark.5",
        withArrow: true,
        arrowSize: 3,
        transitionProps: { transition: 'rotate-left', duration: 120 }
    }

    return (
        <Tooltip {...toolTipProps} style={{fontSize:'0.55rem'}}>
            {children}
        </Tooltip>
    );
};