import { useState, useContext, useEffect } from "react";

import { Group } from "@mantine/core";
import { useFocusTrap } from "@mantine/hooks";

import { PickEmodji } from "./Buttons/PickEmodji";
import { PickAttachement } from "./Buttons/PickAttachement";
import { MessageInput } from "./MessageInput";
import { SendMessage } from "./Buttons/SendMessage";
import { sendTypingEvent } from "../helpers/sendTypingEvent";

import { ChatContext } from "../../../../widgets";
import { SocketContext } from "../../../../pages";


interface IInputBodyProps {
    attachementRef: React.RefObject<() => void>

    messageSending: boolean
    inputValue: string

    sendMessage: () => void
    setInputValue: (value: string) => void
}

export const InputBody: React.FC<IInputBodyProps> = ({ attachementRef, inputValue, setInputValue, sendMessage, messageSending }) => {
    const [isTyping, setIsTyping] = useState<boolean>(false)

    const focusTrapRef = useFocusTrap();

    const chat = useContext(ChatContext)
    const socket = useContext(SocketContext)

    useEffect(() => {
        const isInputEmpty = inputValue.length === 0
        if (isInputEmpty !== isTyping) {

            setIsTyping(isInputEmpty)
            console.log(socket)
            if (socket) {
                sendTypingEvent(socket, !isInputEmpty, chat.id)
            }
        }
    }, [inputValue])

    const handleEmojiSelect = (emodji: string) => {
        setInputValue(inputValue.concat('', emodji));
    };

    return (
        <Group noWrap px='md'>
            <PickAttachement openFileExplorer={attachementRef} />
            <MessageInput inputValue={inputValue} setInputValue={setInputValue} focusRef={focusTrapRef} />
            <PickEmodji onEmojdiPick={handleEmojiSelect} />
            <SendMessage onAction={() => sendMessage()} isLoading={messageSending} />
        </Group>
    );
};