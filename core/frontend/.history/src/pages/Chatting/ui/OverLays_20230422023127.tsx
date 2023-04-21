import { Notifications } from "@mantine/notifications"

import { SessionExpiredModal, Captcha } from "../../../features"
import ContactModal from "../../../entities/Contact/ui/Modal/ContactModal"

export const OverLays = (): JSX.Element => {
    return (
        <>
            <Notifications />
            <SessionExpiredModal />
            <Captcha />
            <ContactModal />
        </>
    )
}



