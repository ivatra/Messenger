import { Stack, Text } from "@mantine/core";
import { CustomToolTip, CustomAvatar } from "../../../../shared";
import { useRef } from "react";

interface IUserAvatarProps {
    name: string
    login: string
    avatar: string
}

export const UserAvatar: React.FC<IUserAvatarProps> = ({ name, login, avatar }) => {
    const ref = useRef<HTMLDivElement>(null);

    const Popover =
        <Stack spacing='0.1rem' m={0}>
            <Text>{name}</Text>
            <Text>@{login}</Text>
        </Stack>

    return (
        <CustomToolTip label={Popover}>
            <CustomAvatar size='md' avatarSrc={avatar} ref={ref} />
        </CustomToolTip>
    );
}
