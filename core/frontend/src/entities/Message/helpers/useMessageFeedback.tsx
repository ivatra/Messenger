import { useMemo } from "react"

import { Loader } from "@mantine/core"

import { IconCheck, IconChecks, IconExclamationCircle } from "@tabler/icons-react"



interface IProps {
    status?: string,
    isRead: boolean,
    iconSize: string
}

export const useMessageFeedBack = ({ iconSize, isRead, status }: IProps) => {
    const messageFeedback = useMemo(() => {

        if(isRead){
            return <IconChecks size={iconSize} />
        }
        
        switch (status) {
            case 'error': {
                return <IconExclamationCircle size={iconSize} />
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