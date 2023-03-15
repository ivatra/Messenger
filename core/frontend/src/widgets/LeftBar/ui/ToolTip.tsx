import { Text, Group, ActionIcon,Tooltip } from "@mantine/core";
import { TablerIconsProps } from "@tabler/icons-react";

export interface IToolTip {
    title: string;
    Icon: (props: TablerIconsProps) => JSX.Element;
}

export const ToolTip:React.FC<IToolTip> = ({title, Icon}) => {
    return (
            <Tooltip label = {title} >
                <ActionIcon size={'1.5rem'}>
                    <Icon />
                </ActionIcon>
            </Tooltip>
    );
};
