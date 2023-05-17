import { useContactInteractionStore } from "../../../../entities"
import { SharedTypes } from "../../../../shared"

export async function fetchSender (chat:SharedTypes.IChat,senderId: string) {
    const participant = chat.participants.find((participant) => participant.user.id === senderId)
    
    if (participant) return participant.user

    const { receiveContactById } = useContactInteractionStore.getState() 

    const contact = await receiveContactById(senderId) // in case the user who wrote the message was removed from the chat

    return contact
}