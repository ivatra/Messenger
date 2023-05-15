import { MemoizedOverlays } from "./OverLays"
import { SocketContext } from "../helpers/SocketContext"
import { MemoziedChattingPage } from "./ChattingContent"

import { useWebSocket } from "../helpers/useWebSocket"

import { WS_URL } from "../../../shared";
import { useUserStore } from "../../../entities";

export const ChattingPage = (): JSX.Element => {
    const {id} = useUserStore().profile

    const socket = useWebSocket(WS_URL,id)

    return (
        <SocketContext.Provider value={socket}>
            <MemoizedOverlays />
            <MemoziedChattingPage />
        </SocketContext.Provider>
    )
}



