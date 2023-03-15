import { Stack, StackProps } from "@mantine/core";
import { IToolTip, ToolTip } from "./ToolTip";

interface ToolTipsProps {
    Links: IToolTip[];
}

const stackProps = {
    align:"center", 
    justify:"space-between", 
    w: 'md', 
    color: 'red'
}

export const ToolTips: React.FC<ToolTipsProps> = ({Links}) => (
    <Stack {...stackProps}>
        {Links.map((link: IToolTip) => (
            <ToolTip key={link.title} title={link.title} Icon={link.Icon} />
        ))}
    </Stack>
);
