import { Box, BoxProps, Button, Group, GroupProps, Text } from "@mantine/core";
import { Dropzone, DropzoneProps, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";

import { useDropzoneStyles } from "./ImageDropzone.styles";
import { ImageDropzoneBody } from "./ImageDropzoneBody";
import { useState } from "react";


/* Dropzone
    It is't active until user drops an image
    When user drops a file it has a feedback (does file compare with data type)
    There are 2 feedbacks - accepted and rejected
    Accepted or rejected should be at the center of dropzone area
*/

interface IImageDropzoneProps {
    bottomOffset: number;
    parentHeight: number;
    openRef: React.RefObject<() => void>
    setFiles: (files: FileWithPath[]) => void
}


export const ImageDropzone: React.FC<IImageDropzoneProps> = ({
    parentHeight,
    bottomOffset,
    openRef,
    setFiles
}) => {
    const { dropzone } = useDropzoneStyles()

    const [isDragging, setDragging] = useState<boolean>(false)

    const dropZoneProps: Omit<DropzoneProps, "children"> = {
        onDrop: (files) => setFiles(files),

        onDragEnter: () => setDragging(true),
        onDragLeave: () => setDragging(false),

        maxSize: 3 * 1024 ** 2,
        accept: IMAGE_MIME_TYPE,
        maxFiles: 1,
        multiple: false,
        activateOnClick: false,

        top: bottomOffset,
        className: dropzone,

        openRef: openRef
    };

    const boxProps: BoxProps = {
        pos: "absolute",
        w: "100%",
        h: parentHeight - bottomOffset,
        p: '4px',
    }

    return (
       <Box {...boxProps}>
            <Dropzone {...dropZoneProps}>
                <ImageDropzoneBody isDraging={isDragging} />
            </Dropzone>
        </Box>
    );
};
