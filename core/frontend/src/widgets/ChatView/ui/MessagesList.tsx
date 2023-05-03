import { useState, ReactNode, useEffect, useContext, useRef } from "react";
import { Stack } from "@mantine/core";
import { useDidUpdate } from "@mantine/hooks";
import { useMessageStore, Message } from "../../../entities";
import { IChat, NothingFoundView, ScrollableList } from "../../../shared";
import { fetchSender } from "../helpers/fetchSender";
import { ChatContext } from "../helpers/ChatContext";
import { IContentItem } from "../../../entities/Message/types/Model";
import { ParticipantAction } from "../../../entities/Message/ui/ParticipantAction";
import { IStoreMessage } from "../../../entities/Message/types/Store";

interface IMessagesListProps {
    messages: IStoreMessage;
    isLoading: boolean;
}

export const MessagesList: React.FC<IMessagesListProps> = ({
    messages,
    isLoading,
}): JSX.Element => {
    const chat = useContext(ChatContext);

    const { receiveMessages, page, setPage, messagesAmount } = useMessageStore();
    const scrollViewPort = useRef<HTMLDivElement>(null);

    const [renderedMessages, setRenderedMessages] = useState<JSX.Element[]>([]);

    useEffect(() => {
        if (messages[chat.id] && messages[chat.id].length > messagesAmount) return;
        receiveMessages(chat.id, 25);
    }, [page]);

    useDidUpdate(() => {
        const fetchAndRenderMessages = async () => {
            const messagesComponent = await Promise.all(
                messages[chat.id].map(renderItem)
            );

            const filteredMessages = messagesComponent.filter((message) => message !== undefined) as JSX.Element[];
            setRenderedMessages(filteredMessages);
        };

        fetchAndRenderMessages();
    }, [messages]);

    const renderItem = async (message: IContentItem) => {
        if (message.type === "Message") {
            const sender = await fetchSender(chat, message.data.senderId);

            if (!sender) return;

            return <Message message={message.data} sender={sender} key={message.data.id} />;
        } else {
            return <ParticipantAction {...message.data} />;
        }
    };

    return (
        <>
            {renderedMessages.length > 0  ? (
                <ScrollableList
                    isLoading={isLoading}
                    EntitiesList={renderedMessages}
                    scrollRef={scrollViewPort}
                />
            ) : <>nothing found</>}
        </>
    );
};

//nothing found doesnt work correctly.we should handle if messages if null and isloading = false then show it