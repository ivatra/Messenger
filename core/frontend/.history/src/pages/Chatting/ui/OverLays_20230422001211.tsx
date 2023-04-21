import { Notifications } from "@mantine/notifications"

import { SessionExpiredModal, Captcha } from "../../../features"

export const OverLays = (): JSX.Element => {
    return (
        <>
            <Notifications />
            <SessionExpiredModal />
            <Captcha />
        </>
    )
}



