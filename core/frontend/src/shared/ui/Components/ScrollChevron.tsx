import { ActionIcon, ActionIconProps } from "@mantine/core";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";


type posKeys = 'bottom' | 'top' | 'right' | 'left';

type pos = {
    [key in posKeys]?: string | number;
};

const actionIconProps: ActionIconProps = {
    variant: 'light',
    bg: 'dark.6',
    radius: 'xl',
    size: '2.5rem',
    pos: 'absolute',
};

interface IShevronProps {
    onClick: () => void;
    position: 'up' | 'bottom';
    visible: boolean
    pos: pos
}

export const ScrollChevron: React.FC<IShevronProps> = ({
    onClick,
    position,
    visible,
    pos
}) => {
    const ChevronIcon = position === 'bottom' ? IconChevronDown : IconChevronUp;

    return (
        <>
            {visible ? (
                <ActionIcon
                    {...actionIconProps}
                    {...pos}
                    onClick={onClick}>
                    <ChevronIcon size="2.5rem" stroke={1.5} />
                </ActionIcon>
            ) : null}
        </>
    );
};
