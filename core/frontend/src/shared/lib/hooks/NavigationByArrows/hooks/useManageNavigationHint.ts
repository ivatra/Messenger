import { useEffect } from "react"

import { notifications } from "@mantine/notifications"

import { getNavigationProps } from "../helpers/getNavigationProps"

const NotificationId = "navigation-hint"

export const useManageNavigationHint = (isToggled: boolean, navigateButton: string) => {
    const navigationProps = getNavigationProps(isToggled, navigateButton)
    
    useEffect(() => {
        notifications.show({ ...navigationProps, id: NotificationId })

        return () => notifications.hide(NotificationId)
    }, [])
    
    useEffect(() => {
        notifications.update({ ...navigationProps, id: NotificationId })

    }, [isToggled])


}