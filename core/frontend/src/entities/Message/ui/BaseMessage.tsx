import { useMessageFeedBack } from "../helpers/useMessageFeedback"
import { IListMessage } from "../types/Model"
import { GroupMessage } from "./GroupMessage"
import { IMessageBodyProps, MessageBody } from "./MessageBody"

import { SharedHelpers } from "../../../shared"


interface IProps {
    message: IListMessage
    chatType: 'group' | 'individual'
    isSentBySelf: boolean
    senderName: string
    senderAvatarUrl: string
    onUserNameClick: () => void

}

export const BaseMessage = ({ message, isSentBySelf, chatType, onUserNameClick, senderAvatarUrl, senderName }: IProps) => {
    
    const messageFeedback = useMessageFeedBack({
        iconSize: '1rem',
        isRead: message.isRead,
        status: message.status
    })

    const messageSentDate = SharedHelpers.formatDate(message.createdAt)

    const messageBodyBaseProps: IMessageBodyProps = {
        messageSentDate: messageSentDate,
        isSentBySelf:isSentBySelf,
        attachementUrl: message.attachement?.url,
        textMessage: message.content
    }

    
    if (isSentBySelf) {
        return (
            <MessageBody
                {...messageBodyBaseProps}
                msgFeedBackIcon={messageFeedback}
            />
        )

    } else if (chatType === 'group') {
        return (
            <GroupMessage
                avatarUrl={senderAvatarUrl}
                userName={senderName}
                onUserClick={onUserNameClick}>
                <MessageBody
                    {...messageBodyBaseProps}
                    isMentioned={message.isMentioned}
                />

            </GroupMessage>
        )
    } else {
        return (
            <MessageBody
                {...messageBodyBaseProps}
            />
        )

    }
}