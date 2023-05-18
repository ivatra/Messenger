import { IEventRequest } from "./EventRequests";

export interface ISocketActions {
    send: (data: IEventRequest) => void
}