import { useRef, useEffect } from "react"

import { MemoizedOverlays } from "./OverLays"

import { useUserStore } from "../../../entities"
import { subscribeToEvents } from "../../../features/Events/helpers/subscribeToEvents"
import { ChattingContent, MemoziedChattingPage } from "./ChattingContent"
import { SocketContext } from "../helpers/SocketContext"

export const ChattingPage = (): JSX.Element => {
    const { profile } = useUserStore()
    const socket = useRef()

    useEffect(()=>{
        subscribeToEvents(socket, profile.id)
    },[])
    return (
        <SocketContext.Provider value={socket}>
            <MemoizedOverlays />
            <MemoziedChattingPage />
        </SocketContext.Provider>
    )
}



