
import { MemoizedOverlays } from "./OverLays"
import { SocketContext } from "../helpers/SocketContext"
import { MemoziedChattingPage } from "./ChattingContent"

import { useEstabilishWSConnection } from "../helpers/useEstabilishWSConnection"


export const ChattingPage = (): JSX.Element => {
    const socket = useEstabilishWSConnection()

    return (
        <SocketContext.Provider value={socket.current}>
            <MemoizedOverlays />
            <MemoziedChattingPage />
        </SocketContext.Provider>
    )
}



