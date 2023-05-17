import { useState } from "react"

import { Box, Group, Text } from "@mantine/core"

import { SharedTypes } from "../../../../../shared";

interface IButtonTabProps {
    Icon: SharedTypes.ITablerIcon
    label: string
    feedbackIndicator?: JSX.Element
    onClick: () => void
}

export const ButtonTab: React.FC<IButtonTabProps> = ({ Icon, label, feedbackIndicator, onClick }) => {
    const [selected, setSelected] = useState<boolean>(false)

    const boxProps = {
        onMouseEnter: () => setSelected(true),
        onMouseLeave: () => setSelected(false),
        bg: selected ? 'dark.5' : 'initial',
        onClick: onClick
    }

    return (
        <Box {...boxProps} >
            <Group px='lg' spacing={'xl'} py={'xs'} position='apart'>
                <Group>
                    <Icon />
                    <Text>{label}</Text>
                </Group>
                {feedbackIndicator}
            </Group>
        </Box>

    )
}