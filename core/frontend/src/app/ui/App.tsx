import { Notifications } from "@mantine/notifications"
import { ChattingPage } from "../../pages/Chatting"
import { AppRoutes } from "./Routes/AppRoutes"
import StylesProvider from "./StylesProvider"


/*

//TODO: 4 Add group chat.
     First form is -  select avatar and name of grouo)
     Second form - select users ( gonna be modal)

//TODO: Chat View

@TODO:  ... Notifications list ( it gonna have its own state also)  it gonna have its own search by the way
 There are 3 types of notifications:
    Chat (on click it gonna open specificed chat)
    Message ( on click it gonna redirect  to specificied chat 
        and gonna be fine animation of message)
    Contact (onClick it gonna open contact view)


//@TODO: Might be reset of right indicator in edit user drawer when user again enters something



// Handle activation
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