import { useWebSocket } from "../helpers/useWebSocket"
import { SocketContext } from "../helpers/SocketContext"

import { MemoizedOverlays } from "./OverLays"
import { MemoziedChattingPage } from "./ChattingContent"

import { useUserStore } from "../../../entities";
import { SharedConsts } from "../../../shared";


export const ChattingPage = (): JSX.Element => {
    const { id } = useUserStore().profile

    const socket = useWebSocket(SharedConsts.WS_URL, id)

    return (
        <SocketContext.Provider value={socket}>
            <MemoizedOverlays />
            <MemoziedChattingPage />
        </SocketContext.Provider>
    )
}



