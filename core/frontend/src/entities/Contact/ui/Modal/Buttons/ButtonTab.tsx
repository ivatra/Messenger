import { Box, Group, Text } from "@mantine/core"
import { TablerIconsProps } from "@tabler/icons-react"
import { useState } from "react"
import { TablerIcon } from "../../../../../shared"

interface IButtonTabProps {
    Icon: TablerIcon
    label: string
    feedBack?: JSX.Element
    onClick:() => void
}

export const ButtonTab: React.FC<IButtonTabProps> = ({ Icon, label, feedBack,onClick }) => {
    const [selected, setSelected] = useState<boolean>(false)

    const boxProps = {
        onMouseEnter: () => setSelected(true),
        onMouseLeave: () => setSelected(false),
        bg: selected ? 'dark.5' : 'initial',
        onClick:onClick
    }

    return (
        <Box {...boxProps} >
            <Group px='lg' spacing={'xl'} py={'xs'} position ='apart'>
                <Group>
                    <Icon />
                    <Text>{label}</Text>
                </Group>
                {feedBack}
            </Group>
        </Box>

    )
}