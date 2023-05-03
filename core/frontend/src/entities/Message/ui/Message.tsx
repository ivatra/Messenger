import { Card,Text } from "@mantine/core"
import { IMessage, IUser } from "../../../shared"


interface IMessageProps{
    message:IMessage
    sender:any
}

export const Message:React.FC<IMessageProps> = ({message,sender}) =>{
    const userId ='00227f96-f152-450f-a57d-eabc7bc7a43a'
    return (
    <Card
        key={message.id}
        shadow="sm"
        radius="xl"
        style={{
            marginLeft: message.senderId === userId ? 'auto' : 0,
            marginRight: message.senderId === userId ? 0 : 'auto',
            alignSelf: message.senderId === userId ? 'flex-end' : 'flex-start',
        }}
    >
        <Text>{message.content}</Text>
    </Card>)
}