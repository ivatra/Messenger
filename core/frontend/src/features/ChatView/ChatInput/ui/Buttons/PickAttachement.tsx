import { IconPaperclip } from "@tabler/icons-react";
import { PickButton } from "./PickButton";


interface IPickAttachementProps{
    openFileExplorer: React.RefObject<() => void>
}

export const PickAttachement: React.FC<IPickAttachementProps> = ({ openFileExplorer }) => {
    
    return (
        <PickButton Icon={IconPaperclip} onClick={() => openFileExplorer.current !== null && openFileExplorer.current()}/>
        );
}
