import { TextProps, Text } from "@mantine/core"

interface HoverableTextProps extends TextProps {
    color?: string
    children: any
    onClick: () => void
}

export const HoverableText = ({ color, onClick, children }: HoverableTextProps) => {
    const onHoverButtonProps: TextProps = {
        color: color ? color : 'blue.5',
        display: 'inline',
        sx: { '&:hover': { cursor: 'pointer', textDecoration: 'underline' } }
    }

    return (
        <Text {...onHoverButtonProps} onClick={onClick}>
            {' '}{children} {' '}
        </Text>

    )

}