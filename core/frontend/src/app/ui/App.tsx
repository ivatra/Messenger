import { Notifications } from "@mantine/notifications"

import StylesProvider from '../config/StylesProvider'
import { EditUserProvider, LeftBar } from '../../widgets'

import { SessionExpiredModal, Captcha } from '../../features'


// @TODO: Remember on which message was user when he enters another chat
const App = (): JSX.Element => {
    return (
        <StylesProvider>
            <Notifications />
            <SessionExpiredModal />
            <Captcha />
            <EditUserProvider>
                <LeftBar />
            </EditUserProvider>
        </StylesProvider>

    )
}

export default App