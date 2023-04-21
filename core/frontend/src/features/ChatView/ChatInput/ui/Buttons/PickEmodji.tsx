import { ActionIcon, Box } from "@mantine/core";
import { IconMoodSmile } from "@tabler/icons-react";
import { PickButton } from "./PickButton";
import { useState } from "react"; 

import EmojiPicker, {EmojiClickData} from "emoji-picker-react";
import { EmodjiOverlay } from "../EmojdiOverlay";

interface IPickEmodjiProps{
    onEmojdiPick:(emodji:string) => void
}

export const PickEmodji: React.FC<IPickEmodjiProps> = ({onEmojdiPick}) => {
    const [emojdiMenuOpened,openEmodjiMenu] = useState<boolean>(false)

    const onPickButtonClicked = () => openEmodjiMenu(!emojdiMenuOpened)

    const onEmodjiSelect = (emojiData: EmojiClickData, event: any) => onEmojdiPick(emojiData.emoji)

    return (
        <>
            <PickButton Icon={IconMoodSmile} onClick={onPickButtonClicked} />
            {/* <EmodjiOverlay onEmodjiPick={onEmodjiSelect} menuOpened = {emojdiMenuOpened}/> TODO: */}
        </>
    );
}
