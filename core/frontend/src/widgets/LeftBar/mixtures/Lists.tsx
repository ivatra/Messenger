import { Stack, Button,Text } from "@mantine/core";
import React from "react";

export const ChatsList: React.FC = React.memo(() => (
    <Stack>
        <Text>Chats</Text>
        <Button />
        <Button />
        <Button />
    </Stack>
));

export const ContactsList: React.FC = React.memo(() => (
    <Stack>
        <Text>Contacts</Text>
        <Button />
        <Button />
        <Button />
    </Stack>
));

export const NotificationsList: React.FC = React.memo(() => (
    <Stack>
        <Text>NotificationsList</Text>
        <Button />
        <Button />
        <Button />
    </Stack>
));
