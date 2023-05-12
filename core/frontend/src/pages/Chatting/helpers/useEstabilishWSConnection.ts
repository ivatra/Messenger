import { useEffect, useRef } from "react"


import { subscribeToEvents } from "../../../features"
import { useUserStore } from "../../../entities"




export const useEstabilishWSConnection = () => {
    const socket = useRef<WebSocket | null>(null)

    const { profile } = useUserStore()

    useEffect(() => {
        try {
            subscribeToEvents(socket, profile.id)
        } catch (e) {
            console.log(e)
            subscribeToEvents(socket, profile.id)
        }
    }, [])

    return socket
}