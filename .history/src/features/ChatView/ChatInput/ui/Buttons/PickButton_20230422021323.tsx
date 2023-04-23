import { ActionIcon, ActionIconProps, DefaultMantineColor } from "@mantine/core"
import { TablerIcon } from "../../../../"
import { useState } from "react"


interface IPickButton {
    Icon: TablerIcon
    onClick: () => void
}

export const PickButton: React.FC<IPickButton> = ({ Icon, onClick }) => {
    const [buttonSelected, setSelected] = useState<boolean>(false)


    const actionIconProps = {
        onMouseEnter: () => setSelected(true),
        onMouseLeave: () => setSelected(false),
        onClick: onClick,
        c: buttonSelected ? 'dark.1' : 'dark.3'

    }
    return (
        <ActionIcon {...actionIconProps}>
            <Icon />
        </ActionIcon>
    )
}