import { Box, BoxProps, Group, GroupProps, MantineNumberSize, Stack, Text } from "@mantine/core";

import { IUser } from "../..";

import { SharedHelpers, SharedUi } from "../../../shared";


const groupProps: GroupProps = {
    spacing: 'sm',
    noWrap: true,

}

interface IUserCardProps {
    user: IUser
    props?: BoxProps
    userNameSize: MantineNumberSize
    avatarSize: MantineNumberSize
    activityLabelSize: MantineNumberSize

}

export const UserCard: React.FC<IUserCardProps> = ({ props, avatarSize, activityLabelSize, userNameSize, user }) => {
    const dateSeen = user.lastSeen ? SharedHelpers.formatDate(user.lastSeen) : 'unknown'
    return (
        (
            <Box {...props}>
                <Group {...groupProps}>
                    <SharedUi.CustomAvatar avatarSrc={user.avatar} size={avatarSize} />
                    <Stack spacing={'0px'} justify="center">
                        <SharedUi.UserName name={user.name} nameSize={userNameSize} />
                        <Text size={activityLabelSize} color='dark.2' >last seen {dateSeen}</Text>
                    </Stack>
                </Group>
            </Box>
        )
    );
};
