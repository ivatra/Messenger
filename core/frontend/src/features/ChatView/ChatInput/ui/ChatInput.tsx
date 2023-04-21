
import { Box } from "@mantine/core";


import { InputBody } from "./InputBody";
import { ImageDropzone } from "./Dropzone/ImageDropzone";
import { useRef, useState } from "react";
import { FileWithPath } from "react-dropzone";
import { ImagePreview } from "./ImagePreview";




interface IChatInputProps {
    parentHeight: number
}

export const ChatInput: React.FC<IChatInputProps> = ({ parentHeight }) => {
    const openAttachementPickRef = useRef<() => void>(null);
    const [files, setFiles] = useState<FileWithPath[]>([]);

    return (
        <>
            <ImageDropzone
                parentHeight={parentHeight}
                bottomOffset={60}
                openRef={openAttachementPickRef}
                setFiles={setFiles}
            />
            <Box bg='dark.6' mah='400px'>
                <ImagePreview file={files[0]} removeImage={() => setFiles([])}/>
                <InputBody attachementRef={openAttachementPickRef} />
            </Box>
        </>
    )
}