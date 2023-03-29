import { Text } from "@mantine/core"

interface IContentProps{
    content:string
}

export const MessageText: React.FC<IContentProps> = ({content}) => (
    <Text size={'xs'} color="dark.2" lineClamp={1}>
        {content}
    </Text>
)

