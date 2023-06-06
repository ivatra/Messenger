import { Group, Text, TextProps, useMantineTheme } from "@mantine/core"
import { MessagesCounter } from "./MessagesCounter";

interface IContentProps {
    content: string
    countOfUnreadMsgs: number
}

const textProps: TextProps = {
    size: 'xs',
    color: 'dark.2',
    truncate:true,
    display:'block',
    lineClamp: 1
}


export const MessageFotter: React.FC<IContentProps> = ({ content, countOfUnreadMsgs }) => {

    return (
        <Group noWrap position="apart" w = '100%' h = '100%'>
            <Text {...textProps}>
                {content.slice(0,50)} {content.length > 50 && '...'}
            </Text>
            <Group position="right">
                {/* <MessagesCounter count={11}/> */}
                {countOfUnreadMsgs !== 0 && <MessagesCounter count={countOfUnreadMsgs} />}
            </Group>
        </Group>

    )
}

