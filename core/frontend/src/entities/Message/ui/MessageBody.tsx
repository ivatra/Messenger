import { Box, Flex, Group, Image, Stack, Text } from "@mantine/core";
import { CustomAvatar } from "../../../shared/ui";
import { SharedConsts } from "../../../shared";
import { ImagePreview } from "./ImagePreview";
import { useMessageStore } from "../Store/MessageStore";


export interface IMessageBodyProps {
    textMessage: string;
    isSentBySelf: boolean;
    attachementUrl?: string;
    messageSentDate: string;
    isMentioned?: boolean;
    msgFeedBackIcon?: JSX.Element;
}

export const MessageBody: React.FC<IMessageBodyProps> = ({
    msgFeedBackIcon,
    isSentBySelf,
    messageSentDate,
    isMentioned,
    textMessage,
    attachementUrl,
}) => {

    const {setImageViewEnabled}  = useMessageStore()


    const onAttachementClick = () =>{
        if(!attachementUrl) return

        setImageViewEnabled(attachementUrl)
    }
    return (
        <Stack
            bg={isSentBySelf ? '#2b5278' : '#182533'}
            miw='5rem'
            p='0.5rem'
            style={{ borderRadius: '1rem' }}>
            {attachementUrl && <ImagePreview url={attachementUrl} onClick={onAttachementClick} />}
            <Flex align="flex-end" justify="space-between" >
                <Text
                    size={"sm"}
                color={isMentioned ? "blue.5" : "inherit"}
                    style={{ wordWrap: 'break-word', overflowWrap: 'break-word', wordBreak: 'break-all' }}>
                    {textMessage}
                </Text>
            </Flex>
            <Flex justify="flex-end" align="flex-end" wrap="nowrap">
                <Group align='center' spacing='xs'>
                    <Text truncate="end" size='xs'>{messageSentDate}</Text>
                    {msgFeedBackIcon && msgFeedBackIcon}
                </Group>
            </Flex>
        </Stack>

    );
};
