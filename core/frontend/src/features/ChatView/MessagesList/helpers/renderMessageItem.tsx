import { RefObject, cloneElement } from "react";

import { fetchSender } from "./fetchSender";

import { IContentItem, Message, ParticipantAction } from "../../../../entities";
import { SharedTypes } from "../../../../shared";

const checkAttributesChanged = (oldAttributes: { [key: string]: any }, newAttributes: { [key: string]: any }): boolean => {
    for (const key in oldAttributes) {
        if (oldAttributes[key] !== newAttributes[key]) return true;
    }
    return false;
}

interface IRenderItemCache {
    [id: number]: {
        element: JSX.Element,
        attributes: { [key: string]: any }
    }
}

const renderItemCache: IRenderItemCache = {};

const renderItem = async (chat: SharedTypes.IChat, containerRef: RefObject<HTMLDivElement>, userAgentId: string, message: IContentItem) => {
    if (message.type === "Message") {
        const messageData = message.data
        const cacheItem = renderItemCache[messageData.id]
        const newAttributes = { isMessageRead: messageData.isRead, status: messageData.status }

        if (cacheItem) {
            if (!checkAttributesChanged(cacheItem.attributes, newAttributes)) {
                return cacheItem.element;
            } else {
                const clonedElement = cloneElement(cacheItem.element, { message: messageData })
                return clonedElement
            }
        }

        const sender = await fetchSender(chat, messageData.senderId);

        if (!sender) {
            return <></>
        }

        const renderedMessage = (
            <Message
                message={messageData}
                sender={sender}
                scrollAreaRef={containerRef}
                key={messageData.index}
                isSentBySelf={userAgentId === sender.id}
            />
        );

        renderItemCache[messageData.id] = { element: renderedMessage, attributes: newAttributes };

        return renderedMessage;
    } else {
        const victim = await fetchSender(chat, message.data.victimId)
        const inviter = chat.participants.find((part) => part.user.id === message.data.causeId)

        if (!victim || !inviter) return <></>

        const renderedParticipantAction = <ParticipantAction
            key={message.data.id}
            inviter={inviter.user}
            type={message.data.type}
            victim={victim} />;

        return renderedParticipantAction;
    }
};

export default renderItem;
