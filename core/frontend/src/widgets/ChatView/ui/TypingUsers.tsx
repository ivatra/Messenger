import { SharedTypes } from "../../../shared";

import { Text } from "@mantine/core"

interface ITypingUsersProps {
    typingUsers: SharedTypes.IChatParticipant[]
}

export const TypingUsers: React.FC<ITypingUsersProps> = ({ typingUsers }) => {

    if(typingUsers.length <  1) return <></>
    
    return (
        <Text >{typingUsers.map((participant) => participant.user.name)} is Typing</Text>
    )
}