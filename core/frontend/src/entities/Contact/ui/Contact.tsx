import { IContact } from "../..";
import { Box, BoxProps, Group, GroupProps, MantineNumberSize, Stack, Text } from "@mantine/core";
import { CustomAvatar, formatDate } from "../../../shared";
import { UserName } from "../../../shared/ui/Components/UserName";


const groupProps: GroupProps = {
    spacing: 'sm',
    noWrap: true,

}

interface IContactProps {
    contact: IContact;
    props?:BoxProps
    userNameSize:MantineNumberSize
    avatarSize:MantineNumberSize
    activityLabelSize:MantineNumberSize

}

export const Contact: React.FC<IContactProps> = ({ contact, props, avatarSize, activityLabelSize, userNameSize }) => {
    const dateSeen = contact.lastSeen ?  formatDate(contact.lastSeen) : 'unknown'

    return (
        <Box {...props}>
            <Group {...groupProps}>
                <CustomAvatar avatarSrc={contact.avatar} size={avatarSize} />
                <Stack spacing={'0px'} justify="center">
                    <UserName name={contact.name} nameSize={userNameSize}/>
                    <Text size={activityLabelSize} color='dark.2' >last seen {dateSeen}</Text>
                </Stack>
            </Group>
        </Box>
    );
};
