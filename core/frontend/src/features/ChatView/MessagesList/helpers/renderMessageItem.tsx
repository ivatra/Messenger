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

const renderItem = (selected:boolean,chat: SharedTypes.IChat, containerRef: RefObject<HTMLDivElement>, userAgentId: string, message: IContentItem) => {
    if (message.type === "Message") {
        const messageData = message.data
        // const cacheItem = renderItemCache[messageData.id]
        // const newAttributes = { isMessageRead: messageData.isRead, status: messageData.status }

        // if (cacheItem) {
        //     if (!checkAttributesChanged(cacheItem.attributes, newAttributes) && !selected) {
        //         return cacheItem.element;
        //     } else {
        //         const clonedElement = cloneElement(cacheItem.element, { message: messageData })
        //         return clonedElement
        //     }
        // }

        const sender = chat.participants.find((participant) => participant.user.id === messageData.senderId)

        if (!sender) {
            return <>Sender was removed from chat :(.</>
        }

        const renderedMessage = (
            <Message
                isSelected = {selected}
                message={messageData}
                sender={sender.user}
                scrollAreaRef={containerRef}
                key={messageData.index}
                isSentBySelf={userAgentId === sender.user.id}
            />
        );

        // renderItemCache[messageData.id] = { element: renderedMessage, attributes: newAttributes };

        return renderedMessage;
    } else {
        const renderedParticipantAction = <ParticipantAction {...message.data} />;
        return renderedParticipantAction;
    }
};

export default renderItem;
