import { useMemo } from "react"

import { ActionIcon, Loader } from "@mantine/core"

import { IconCheck, IconChecks, IconExclamationCircle } from "@tabler/icons-react"



interface IProps {
    status?: string,
    onErrorIconClick:() => void
    isRead: boolean,
    iconSize: string
}

export const useMessageFeedBack = ({ iconSize, isRead, status, onErrorIconClick }: IProps) => {
    const messageFeedback = useMemo(() => {

        if (isRead) {
            return <IconChecks size={iconSize} />
        }

        switch (status) {
            case 'error': {
                return (
                    <ActionIcon onClick={() => {onErrorIconClick()}}>
                        <IconExclamationCircle size={iconSize} />
                    </ActionIcon>
                )
            }
            case 'loading': {
                return <Loader size={iconSize} />
            }
            case 'sent': {
                return <IconCheck size={iconSize} />
            }
            default: {
                return <></>
            }
        }

    }, [status, isRead])

    return messageFeedback
}