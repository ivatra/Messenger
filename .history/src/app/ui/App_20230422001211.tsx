import { ChattingPage } from "../../pages/Chatting"
import StylesProvider from "./StylesProvider"


// @TODO: Remember on which message was user when he enters another chat
const App = (): JSX.Element => {
    return (
        <StylesProvider> 
            <ChattingPage/>
        </StylesProvider>
    )
}

export default App