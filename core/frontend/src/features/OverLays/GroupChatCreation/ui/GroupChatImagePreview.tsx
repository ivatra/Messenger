import { useState } from "react";

import { FileButton, UnstyledButton, Avatar, UnstyledButtonProps, Button, Paper, PaperProps, AvatarProps } from "@mantine/core"
import { IconCamera, TablerIconsProps } from "@tabler/icons-react"


const paperProps: PaperProps = {
    style: { justifyContent: 'center', alignItems: 'center' },
    h: '4rem',
    w: '4rem',
    display: 'flex'
}

const iconCameraProps: TablerIconsProps = {
    color: 'white',
    size: '2rem',
    style: { position: 'absolute', zIndex: 10000 }
}

interface IProps {
    setFile: (file: File) => void
    file: File | null
}

export const GroupChatImagePreview: React.FC<IProps> = ({ file, setFile }) => {
    const [isHovered, setIsHovered] = useState(false);

    const unstyledButtonProps: UnstyledButtonProps = {
        style: { borderRadius: '50%' },
        opacity: isHovered ? 0.5 : 1,
        h: '100%',
        w: '100%',
        bg: 'blue.4'
    }

    const avatarProps: AvatarProps = {
        opacity: isHovered ? 0.5 : 1,
        size: '100%',
        radius: 'xl'
    }

    return (
        <FileButton onChange={setFile} accept="image/png,image/jpeg">
            {(props) =>
                <Paper
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    {...props}
                    {...paperProps}>
                    {!file
                        ? <UnstyledButton {...unstyledButtonProps} />
                        : <Avatar {...avatarProps} src={URL.createObjectURL(file)} />}
                    {(!file || isHovered) && <IconCamera {...iconCameraProps} />}
                </Paper>}
        </FileButton>

    )
}