import { FileWithPath } from "@mantine/dropzone"

import { ActionIcon, ActionIconProps, Box, Image, ScrollArea, Stack } from "@mantine/core"
import { IconCircleX, IconX } from "@tabler/icons-react"

interface IImagePreviewProps {
    file: FileWithPath
    removeImage:() => void
}

export const ImagePreview: React.FC<IImagePreviewProps> = ({ file,removeImage }) => {

    if (!file) return <></>

    const imageUrl = URL.createObjectURL(file);

    const actionIconProps:ActionIconProps = {
        pos: 'absolute',
        top: '1.5rem',
        right: '1.5rem',
        size: 'md',
        display: 'flex',
        style: { zIndex: 1000 },
        variant: 'transparent',

    };

    return (
        <Stack p='md' pb={0} pos='relative' spacing={0}>
            <ActionIcon {...actionIconProps} onClick={removeImage}>
                <IconCircleX />
            </ActionIcon>
            <ScrollArea type="hover" dir='rtl'>
                <Image
                    src={imageUrl}
                    radius='md'
                    mah={150}
                    imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
                />
            </ScrollArea>
        </Stack>

    )

}