import { Notifications } from "@mantine/notifications"
import { SessionExpiredModal, Captcha } from "../../../features"
import { EditUserProvider, LeftBar } from "../../../widgets"

export const ChattingPage = (): JSX.Element => {
    return (
        <>
            <Notifications />
            <SessionExpiredModal />
            <Captcha />
            <EditUserProvider>
                <LeftBar />
            </EditUserProvider>
        </>
    )
}