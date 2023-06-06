import { Box, BoxProps } from "@mantine/core";

import EmojiPicker, {Theme, EmojiClickData} from "emoji-picker-react";

interface EmodjiOverlayProps {
    onEmodjiPick: (emoji: EmojiClickData, event: MouseEvent) => void
    menuOpened:boolean
} 

export const EmodjiOverlay:React.FC<EmodjiOverlayProps> = ({ onEmodjiPick,menuOpened }) =>  {
    const boxProps:BoxProps = {
        pos:'absolute',
        right:'1rem',
        bottom:'3rem',
        display:menuOpened ? 'block' : 'none'
    }

    return (
        <Box {...boxProps}>
            {/* <EmojiPicker onEmojiClick={onEmodjiPick} theme={Theme.DARK} /> */}
        </Box>
    );
}