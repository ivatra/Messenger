import { useRef } from "react";

import { Stack, Text } from "@mantine/core";
import { CustomToolTip, CustomAvatar } from "../../../../../shared";

import { useUserStore } from "../../../../../entities";

export const UserAvatar = () => {
    const profile = useUserStore((state) => state.profile);
    const ref = useRef<HTMLDivElement>(null);

    const Popover =
        <Stack spacing='0.1rem' m={0}>
            <Text>{profile.name}</Text>
            <Text>@{profile.login}</Text>
        </Stack>

    return (
        <CustomToolTip label={Popover}>
            <CustomAvatar size='md' avatarSrc={profile.avatar} ref={ref} />
        </CustomToolTip>
    );
}
