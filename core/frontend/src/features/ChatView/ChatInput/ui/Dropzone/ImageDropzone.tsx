import { Box, BoxProps, MantineStyleSystemProps } from "@mantine/core";
import { Dropzone, DropzoneProps, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";

import { useDropzoneStyles } from "./ImageDropzone.styles";
import { ImageDropzoneBody } from "./ImageDropzoneBody";


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

    display: MantineStyleSystemProps['display']
    setIsDragging:(value:boolean) => void
}


export const ImageDropzone: React.FC<IImageDropzoneProps> = ({
    parentHeight,
    bottomOffset,
    openRef,
    display,
    setFiles,
    setIsDragging
}) => {
    const { dropzone } = useDropzoneStyles()

    const handleDrop = (files:FileWithPath[]) => {
        setIsDragging(false)
        setFiles(files)
    }
    
    const dropZoneProps: Omit<DropzoneProps, "children"> = {
        onDrop: handleDrop,
        maxSize: 3 * 1024 ** 2,
        accept: IMAGE_MIME_TYPE,
        maxFiles: 1,
        multiple: false,
        activateOnClick: false,

        top: bottomOffset,
        className: dropzone,

        openRef: openRef,
    };

    const boxProps: BoxProps = {
        pos: "absolute",
        w: "100%",
        h: parentHeight - bottomOffset,
        p: '4px',
        display: display
    };

    return (
        <Box {...boxProps} >
            <Dropzone {...dropZoneProps}>
                <ImageDropzoneBody />
            </Dropzone>
        </Box>
    );
};
