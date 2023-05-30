import { IEvents } from "./EventContents"

export type IEvent  = {
    id: string
    recipientId: string
    notify: boolean
} & IEvents
