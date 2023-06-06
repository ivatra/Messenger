import { Notifications } from "@mantine/notifications"

import { AppRoutes } from "../routes/AppRoutes"
import StylesProvider from "./StylesProvider"


/*



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