import { NotificationProps } from "@mantine/notifications"

import { NavigationHint } from "../ui/NavigationHint"

export const getNavigationProps = (isToggled: boolean, navigationButton: string) => {
    const NavigationTitle = isToggled ? 'Navigation is on' : 'Navigation is off'

    const NavigationMessage = <NavigationHint navigateButton={navigationButton} />

    const navigationProps: NotificationProps = {
        message: NavigationMessage,
        autoClose: false,
        title: NavigationTitle,
    }

    return navigationProps

}