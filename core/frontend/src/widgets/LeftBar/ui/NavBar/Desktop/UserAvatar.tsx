import { useRef } from "react";

import { Stack, Text } from "@mantine/core";


import { useUserStore } from "../../../../../entities";
import { SharedUi } from "../../../../../shared";

export const UserAvatar = () => {
    const profile = useUserStore((state) => state.profile);
    const ref = useRef<HTMLDivElement>(null);

    const Popover =
        <Stack spacing='0.1rem' m={0}>
            <Text>{profile.name}</Text>
            <Text>@{profile.login}</Text>
        </Stack>

    return (
        <SharedUi.CustomToolTip label={Popover}>
            <SharedUi.CustomAvatar size='md' avatarSrc={profile.avatar} ref={ref} />
        </SharedUi.CustomToolTip>
    );
}
