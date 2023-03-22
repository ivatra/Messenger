import { Loader } from "@mantine/core"
import { IconChecks, IconExclamationCircle } from "@tabler/icons-react"

export const iconBaseProps = {
    size: '1.3rem'
}

const successIconProps = {
    ...iconBaseProps,
    color: 'lime'
}

const errorIconProps = {
    ...iconBaseProps,
    color: 'red'
}

export const successIcon = (
    <IconChecks {...successIconProps} />
)

export const errorIcon = (
    <IconExclamationCircle {...errorIconProps} />

)

export const loaderIcon = (
    <Loader {...iconBaseProps} />
)