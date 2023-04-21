import { Group, Paper, Stack } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { ChatInput } from "../../../features";



interface IChatRoomProps {
    chatId: string
}


//Chat input doesnt rerenders
export const ChatRoom: React.FC<IChatRoomProps> = ({ chatId }) => {
    const { ref: elementSizeRef, width, height } = useElementSize();

    return (
        <Stack w='100%' h='100%' spacing={0} ref={elementSizeRef}>
            <Group w='100%' h={60} bg='red' />
            <Paper w='100%' h='100%' bg='blue'>
                {chatId}
            </Paper>
            <ChatInput parentHeight={height} />
        </Stack>
    )

}