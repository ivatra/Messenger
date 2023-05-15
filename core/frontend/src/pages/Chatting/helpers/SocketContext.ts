import { createContext } from "react";

import { IEventRequest } from "../../../shared";


interface SocketActions {
    send: (data: IEventRequest) => void
}

type SocketType = SocketActions | null

export const SocketContext = createContext<SocketType>(null)
