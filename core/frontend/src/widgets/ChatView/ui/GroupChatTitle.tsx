import { Group, Stack,Text } from "@mantine/core"

import { SharedUi } from "../../../shared"


interface IProps{
    name:string
    avatarUrl:string
    countOfParticipants:number
}

export const GroupChatTitle:React.FC<IProps> = ({name,avatarUrl,countOfParticipants}) =>{
    return (
        <Group>
            <SharedUi.CustomAvatar avatarSrc={avatarUrl} size={'md'} />
            <Stack>
                <SharedUi.UserName name={name}/>
                <Text>{countOfParticipants} in chat</Text>
            </Stack>
        </Group>
    )


}