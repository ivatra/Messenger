import { Notifications } from "@mantine/notifications"

import { AppRoutes } from "../routes/AppRoutes"
import StylesProvider from "./StylesProvider"


/*

//@TODO: Might be reset of right indicator in edit user drawer when user again enters something



chat info menu (chat name,chat avatar,participants and interaction with them)
attachemens grid modal
in contact info add contact to group chat(need to filter chats by group)
localization with i18


*/
const App = (): JSX.Element => {
    return (
        <StylesProvider>
            <Notifications />
            <AppRoutes />
        </StylesProvider>
    )
}

export default App