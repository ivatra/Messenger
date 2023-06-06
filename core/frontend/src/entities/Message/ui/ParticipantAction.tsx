import { Box } from "@mantine/core"
import { IParticipantAction } from "../types/Model"
import { IUser } from "../../../shared/types"


interface IProps{
    victim:IUser
    inviter:IUser
    type:'Added' | 'Removed'
}

export const ParticipantAction: React.FC<IProps> = ({ victim,inviter,type }) => {

    return (
        <Box>
            {inviter.name} {type} {victim.name}
        </Box>
    )
}