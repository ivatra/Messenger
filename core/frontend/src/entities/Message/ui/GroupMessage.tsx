import { Group, Text, Stack } from "@mantine/core"
import { MessageBody } from "./MessageBody"
import { SharedUi } from "../../../shared"


interface IProps {
    avatarUrl: string
    userName: string
    onUserClick: () => void
    children: JSX.Element
}

export const GroupMessage: React.FC<IProps> = ({ avatarUrl, userName, children, onUserClick }) => {
    return (
        <Group noWrap style = {{alignItems:'flex-end'}} spacing = 'xs'>
            <SharedUi.CustomAvatar avatarSrc={avatarUrl} size='sm' />
            <Stack spacing = {0}>
                <Text onClick={() => onUserClick}>{userName} </Text>
                {children}
            </Stack>
        </Group>
    )
}