import { ActionIcon, ActionIconProps } from "@mantine/core";
import { IconChevronsUp, IconChevronsDown } from "@tabler/icons-react";


type posKeys = 'bottom' | 'top' | 'right' | 'left';

type pos = {
    [key in posKeys]?: string | number;
};

const actionIconProps: ActionIconProps = {
    variant: 'light',
    bg: 'dark.8',
    radius: 'xl',
    size: '2.8rem',
    pos: 'absolute',
};

interface IShevronProps {
    onClick: () => void;
    position: 'up' | 'bottom';
    visible: boolean
    pos: pos
}

export const ScrollShevron: React.FC<IShevronProps> = ({
    onClick,
    position,
    visible,
    pos
}) => {
    const ChevronIcon = position === 'bottom' ? IconChevronsDown : IconChevronsUp;

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
