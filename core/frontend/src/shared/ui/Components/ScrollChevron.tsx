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

export const ScrollShevron: React.FC<IShevronProps> = ({
    onClick,
    position,
    visible,
    pos
}) => {
    const ChevronIcon = position === 'bottom' ? IconChevronDown : IconChevronUp;

    const handleClick = (e:any) =>{
        e.preventDefault()
        onClick()
    }
    return (
        <>
            {visible ? (
                <ActionIcon
                    {...actionIconProps}
                    {...pos}
                    onClick={handleClick}>
                    <ChevronIcon size="2.5rem" stroke={1.5} />
                </ActionIcon>
            ) : null}
        </>
    );
};
