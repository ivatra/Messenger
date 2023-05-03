import { Group } from "@mantine/core";
import { PickEmodji } from "./Buttons/PickEmodji";
import { PickAttachement } from "./Buttons/PickAttachement";
import { MessageInput } from "./MessageInput";
import { SendMessage } from "./Buttons/SendMessage";
import { useState, useContext, useEffect } from "react";
import { SocketContext } from "../../../../pages/Chatting";
import { ChatContext } from "../../../../widgets/ChatView/helpers/ChatContext";
import { useDidUpdate } from "@mantine/hooks";

interface IInputBodyProps{
    attachementRef: React.RefObject<() => void>
}

export const InputBody:React.FC<IInputBodyProps> = ({attachementRef}) => {
    const [isTyping, setIsTyping] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>('');

    const socket = useContext(SocketContext)
    const chat = useContext(ChatContext)

    useEffect(() => {
        const isInputEmpty = inputValue.length === 0
        if (isInputEmpty !== isTyping) {

            setIsTyping(isInputEmpty)

            const event = {
                type: 'typing',
                data:{
                    chatId: chat.id,
                    isTyping: inputValue ? true : false
                }
          
            }
            socket.current.send(JSON.stringify(event))
        }
    }, [inputValue])

    const handleEmojiSelect = (emodji: string) => {
        setInputValue(inputValue.concat('', emodji));
    };

    return (
        <Group noWrap px='md'>
            <PickAttachement openFileExplorer = {attachementRef}/>
            <MessageInput inputValue={inputValue} setInputValue={setInputValue} />
            <PickEmodji onEmojdiPick={handleEmojiSelect} />
            <SendMessage onAction={() => { }} isLoading={false} />
        </Group>
    );
};