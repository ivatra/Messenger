import { Box, Group, Stack, Text } from "@mantine/core";

import { IContentItem } from "../../../../../../entities";


interface IProps {
    messages: JSX.Element[],
    searchValue: number | null,
    topRef: (el: any) => void,
    bottomRef: (el: any) => void,
}

export const renderMessages = ({ messages, searchValue: searchIndex, topRef, bottomRef }: IProps) => {

    const observer = (ref: (el: any) => void, dir: 'top' | 'bottom') =>
        <Box
            pos='absolute'
            top={dir === 'top' ? '0px' : undefined}
            bottom={dir === 'bottom' ? '0px' : undefined}
            h={`${5 * messages.length}px`} w='50px'
            // bg={dir === 'top' ? 'blue' : 'yellow'}
            ref={ref}>
        </Box>

    return (
        <Stack
            w='100%'
            spacing={0}
            align='center'
            pos='relative'
            style={{ flexDirection: 'column-reverse', justifyContent: 'center' }}>
            {observer(bottomRef, 'bottom')}
            {messages}
            {observer(topRef, 'top')}
        </Stack>


    );

};
