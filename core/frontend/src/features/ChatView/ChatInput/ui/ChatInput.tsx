import { useContext, useEffect, useRef, useState } from "react";

import { Box } from "@mantine/core";
import { useDidUpdate } from "@mantine/hooks";
import { FileWithPath } from "@mantine/dropzone";


import { InputBody } from "./InputBody";
import { ImageDropzone } from "./Dropzone/ImageDropzone";
import { ImagePreview } from "./ImagePreview";

import { SocketContext } from "../../../../pages/Chatting";


interface IChatInputProps {
    parentHeight: number
    isDragging: boolean
    setIsDragging: (value: boolean) => void
}

export const ChatInput: React.FC<IChatInputProps> = ({ parentHeight, isDragging, setIsDragging }) => {
    const openAttachementPickRef = useRef<() => void>(null);

    const [files, setFiles] = useState<FileWithPath[]>([]);

    const handleFileRemove = () => setFiles([])

    return (
        <>
            <ImageDropzone
                parentHeight={parentHeight}
                bottomOffset={60}
                display={isDragging ? 'flex' : 'none'}
                openRef={openAttachementPickRef}
                setFiles={setFiles}
                setIsDragging={setIsDragging}
            />
            <Box bg='dark.6' mah='400px'>
                <ImagePreview
                    file={files[0]}
                    removeImage={handleFileRemove} />
                <InputBody
                    attachementRef={openAttachementPickRef} />
            </Box>
        </>
    )
}