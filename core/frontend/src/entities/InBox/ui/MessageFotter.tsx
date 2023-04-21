import { Group, Text, TextProps, useMantineTheme } from "@mantine/core"
import { MessagesCounter } from "./MessagesCounter";

interface IContentProps {
    content: string
    countOfUnreadMsgs: number
}

const textProps: TextProps = {
    size: 'xs',
    color: 'dark.2',
    lineClamp: 1
}


export const MessageFotter: React.FC<IContentProps> = ({ content, countOfUnreadMsgs }) => {

    return (
        <Group noWrap position="apart">
            <Text {...textProps}>
                {content}
            </Text>
            <Group position="right">
                {/* <MessagesCounter count={11}/> */}
                {countOfUnreadMsgs !== 0 && <MessagesCounter count={countOfUnreadMsgs} />}
            </Group>
        </Group>

    )
}

