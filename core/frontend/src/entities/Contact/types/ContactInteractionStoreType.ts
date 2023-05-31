import { SharedTypes } from "../../../shared";

export type IContactInteractions = 'all' | 'accepted' | 'pending' | 'outgoing'

export interface IContactInteractionVariables extends SharedTypes.IStoreFeedback {
    contactModalisOpened: boolean
    currentUserId:string | null
}

export interface IContactInteractionsActions {
    addContact: (userId: number) => void
    acceptContact: (contactId: number) => void
    removeContact: (contactId: number) => void

    openModalWithUser: (userId: string) => void

    closeContactModal: (userId:string) => void
}

export type IContactInteractionStore = IContactInteractionVariables & IContactInteractionsActions