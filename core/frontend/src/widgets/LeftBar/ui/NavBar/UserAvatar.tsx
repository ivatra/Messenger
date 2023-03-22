import { Avatar, Stack, Tooltip, Text, TooltipProps } from "@mantine/core";
import { CustomToolTip } from "../../../../shared/ui/CustomToolTip";

interface IUserAvatarProps {
    name: string
    login: string
    avatar: string | null
}

export const UserAvatar: React.FC<IUserAvatarProps> = ({ name, login, avatar }) => {

    const Popover =
        <Stack spacing='0.1rem' m={0}>
            <Text size={'0.55rem'}>{name}</Text>
            <Text size={'0.55rem'}>@{login}</Text>
        </Stack>

    return (
        <CustomToolTip label={Popover}>
            <Avatar size={"1.3rem"} radius="lg" src={avatar} />
        </CustomToolTip>
        );
}
