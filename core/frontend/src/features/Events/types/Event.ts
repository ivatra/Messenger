import { IEvents } from "./EventContents"

export type IEvent  = {
    _id: string
    recipientId: string
    notify: boolean
} & IEvents
