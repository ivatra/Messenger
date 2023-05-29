import { Group } from "@mantine/core"

import { Date } from "./Date"
import { Options } from "./Options"

import { PinnedIcon } from "./PinnedIcon"
import useInboxStore from "../../store/InboxStore"
import { IInbox } from "../../types/InboxModel"
import { useContactInteractionStore } from "../../../Contact"

import { SharedUi } from "../../../../shared"


interface ITitleProps {
    name: string
    messageSentDate: string
    inbox: IInbox
    inboxSelected: boolean
}

export const MessageHeader: React.FC<ITitleProps> = ({ name, inbox, messageSentDate, inboxSelected }) => {
    const { pin } = useInboxStore()
    const { openContactModal, receiveContactById } = useContactInteractionStore.getState()

    const pinInbox = () => pin(inbox.id)

    const openProfile = () => {

        if(inbox.chatType === 'individual'){
            Promise.resolve(receiveContactById(inbox.message.senderId)).
                then((contact) => contact && openContactModal(contact))
        }

    }

    const rightSide = inboxSelected
        ? <Options
            isContactViewAvailable={inbox.chatType === 'individual'}
            openContactView={openProfile}
            pinInbox={pinInbox}
            isInboxPinned={inbox.isPinned} />
        : <Date
            messageSentDate={messageSentDate} />

    return (
        (
            <Group w='100%' position='apart' spacing={0} m={0} noWrap>
                <Group m={0} spacing={0} noWrap >
                    {inbox.isPinned && PinnedIcon}
                    <SharedUi.UserName name={name} />
                </Group>
                <Group ml='xs' noWrap>
                    {rightSide}
                </Group>
            </Group>
        )
    );
}


