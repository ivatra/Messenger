import { Box, BoxProps, Group, GroupProps, MantineNumberSize, Stack, Text } from "@mantine/core";

import { IContact, useContactInteractionStore } from "../..";

import { SharedHelpers, SharedUi } from "../../../shared";
import { IUser } from "../../../shared/types";
import React from "react";


const groupProps: GroupProps = {
    spacing: 'sm',
    noWrap: true,

}

interface IContactProps {
    contact: IContact | IUser
    props?: BoxProps
    userNameSize: MantineNumberSize
    avatarSize: MantineNumberSize
    activityLabelSize: MantineNumberSize

}

export const Contact = React.forwardRef<HTMLDivElement, IContactProps>(({ contact, props, avatarSize, activityLabelSize, userNameSize }, ref) => {
    const dateSeen = contact.lastSeen ? SharedHelpers.formatDate(contact.lastSeen) : 'unknown'

    return (
        <Box ref={ref} {...props}>
            <Group {...groupProps}>
                <SharedUi.CustomAvatar avatarSrc={contact.avatar} size={avatarSize} />
                <Stack spacing={'0px'} justify="center">
                    <SharedUi.UserName
                        name={contact.name}
                        nameSize={userNameSize} />
                    <Text size={activityLabelSize} color='dark.2' >last seen {dateSeen}</Text>
                </Stack>
            </Group>
        </Box>
    );
});
