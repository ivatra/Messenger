import { useState } from "react"

import { ActionIcon, ActionIconProps, DefaultMantineColor } from "@mantine/core"


import {SharedTypes} from "../../../../../shared";


interface IPickButton {
    Icon: SharedTypes.ITablerIcon
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