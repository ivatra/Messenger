import { useCallback, useEffect } from 'react'
import { Notifications } from "@mantine/notifications"
import LeftBar from '../../widgets'
import Styles from '../config/MantineStyles'
import {SessionExpiredModal} from '../../features'
import Captcha from '../../features/OverLays/Captcha/ui/Captcha'



// @TODO: Remember on which message was user when he enters another chat
const App = ():JSX.Element => {
    return (
        <Styles>
            <Notifications />
            <LeftBar />
            <SessionExpiredModal />
            <Captcha/>
        </Styles>

    )
}

export default App