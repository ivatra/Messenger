import { useState } from "react";
import { Group } from "@mantine/core";
import { PickEmodji } from "./Buttons/PickEmodji";
import { PickAttachement } from "./Buttons/PickAttachement";
import { MessageInput } from "./MessageInput";
import { SendMessage } from "./Buttons/SendMessage";

interface IInputBodyProps{
    attachementRef: React.RefObject<() => void>
}

export const InputBody:React.FC<IInputBodyProps> = ({attachementRef}) => {
    const [inputValue, setInputValue] = useState<string>('');

    const onEmojiSelect = (emodji: string) => {
        setInputValue(inputValue.concat('', emodji));
    };

    return (
        <Group noWrap px='md'>
            <PickAttachement openFileExplorer = {attachementRef}/>
            <MessageInput inputValue={inputValue} setInputValue={setInputValue} />
            <PickEmodji onEmojdiPick={onEmojiSelect} />
            <SendMessage onAction={() => { }} isLoading={false} />
        </Group>
    );
};