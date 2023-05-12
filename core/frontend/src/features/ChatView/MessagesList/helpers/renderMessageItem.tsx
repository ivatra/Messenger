import { fetchSender } from "./fetchSender";
import { IContentItem, Message, ParticipantAction } from "../../../../entities";
import { IChat } from "../../../../shared";
import { RefObject, cloneElement } from "react";


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

const renderItem = async (chat: IChat, containerRef: RefObject<HTMLDivElement>, userAgentId: string, message: IContentItem) => {
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
        const renderedParticipantAction = <ParticipantAction {...message.data} />;
        return renderedParticipantAction;
    }
};

export default renderItem;
