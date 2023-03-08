import { FC } from "react";
import { Group, Indicator,Avatar,Text,Stack } from "@mantine/core";
import { IconCircleFilled } from "@tabler/icons-react";

export const ChatItem = () => {
    return (
        <Group noWrap position="apart">
            <Group noWrap spacing="sm">
                <AvatarWithCircle />
                <Text size={15} align="center" truncate>
                    Natasha Romanoff
                </Text>
            </Group>
            <IconCircleFilled />
        </Group>
    );
};

const AvatarWithCircle = () => {
    return (
        <Group position="left">
            <Indicator
                inline
                size={11}
                offset={5}
                color="red"
                position="bottom-end"
                withBorder
                sx={{ borderWidth: "150" }}
            >
                <Avatar
                    size={42}
                    radius={20}
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
                />
            </Indicator>
        </Group>
    );
};
