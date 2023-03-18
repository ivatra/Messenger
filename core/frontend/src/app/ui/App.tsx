import { Notifications } from "@mantine/notifications"
import LeftBar from '../../widgets'
import {Styles} from '../config/MantineStyles'
import { SessionExpiredModal } from '../../features'
import Captcha from '../../features/OverLays/Captcha/ui/Captcha'
import { EditUserProvider } from '../../widgets/LeftBar/hooks/EditUserContext'


// @TODO: Popout when hovers at user avatar (login,name)
// @TODO: Remember on which message was user when he enters another chat
const App = (): JSX.Element => {
    return (
        <Styles>
            <Notifications />
            <SessionExpiredModal />
            <Captcha />
            <EditUserProvider>
                <LeftBar />
            </EditUserProvider>
        </Styles>

    )
}

export default App