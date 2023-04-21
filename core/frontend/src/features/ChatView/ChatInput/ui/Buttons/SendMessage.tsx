import { ActionIcon } from "@mantine/core"
import { IconArrowForward } from "@tabler/icons-react"

interface ISendMessageProps{
    onAction?:() => void
    isLoading?:boolean
}

export const SendMessage:React.FC<ISendMessageProps> = ({onAction,isLoading}) => {
    return (
        <ActionIcon c='blue.4' loading = {isLoading} onClick={onAction}>
            <IconArrowForward size='2.5rem'/>
        </ActionIcon>
    )

}