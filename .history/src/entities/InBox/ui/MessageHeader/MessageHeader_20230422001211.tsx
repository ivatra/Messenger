import { Group } from "@mantine/core"

import { Date } from "./Date"
import { Options } from "./Options"
import { UserName } from "./UserName"
import { PinnedIcon } from "./PinnedIcon"
import useInboxStore from "../../store/InboxStore"
import { IInbox } from "../../types/Model"

interface ITitleProps {
    name: string
    messageSentDate: string
    inbox: IInbox
    inboxSelected: boolean
}

export const MessageHeader: React.FC<ITitleProps> = ({ name, inbox, messageSentDate, inboxSelected }) => {
    const { pin } = useInboxStore()

    const rightSide = inboxSelected
        ? <Options pinInbox={() => pin(inbox.id)} inboxPinned={inbox.isPinned} />
        : <Date messageSentDate={messageSentDate} />

    return (
        <Group w='100%' position='apart' spacing={0} m={0} noWrap>
            <Group m={0} spacing={0} noWrap >
                {inbox.isPinned && PinnedIcon}
                <UserName name={name} />
            </Group>
            <Group ml='xs'>
                {rightSide}
            </Group>
        </Group>

    )
}


