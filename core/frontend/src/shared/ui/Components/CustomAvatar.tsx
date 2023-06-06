import { Avatar, AvatarProps, MantineNumberSize } from "@mantine/core";
import { IMAGES_URL } from "../../consts";
import { forwardRef } from "react";

interface IAvatarProps {
    size: MantineNumberSize
    avatarSrc: string
}


export const CustomAvatar = forwardRef<HTMLDivElement, IAvatarProps>(
    ({ size, avatarSrc }, ref?) => {
        const avatarProps: AvatarProps = {
            size: size,
            radius: 'xl',
            src: IMAGES_URL + avatarSrc,
        }

        return <Avatar {...avatarProps} ref={ref} />
    }
);
