import { createContext } from "react";

import { SharedTypes } from "../../../shared";


interface SocketActions {
    send: (data: SharedTypes.IEventRequest) => void
}

type SocketType = SocketActions | null

export const SocketContext = createContext<SocketType>(null)
