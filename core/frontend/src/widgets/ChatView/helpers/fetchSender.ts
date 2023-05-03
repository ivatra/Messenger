import { useContactInteractionStore } from "../../../entities"
import { IChat } from "../../../shared"

export async function fetchSender (chat:IChat,senderId: string) {
    const sender = chat.participants.find((participant) => participant.user.id === senderId)

    if (sender) return sender

    const { receiveContactById } = useContactInteractionStore.getState()

    const contact = await receiveContactById(senderId)

    return contact
}