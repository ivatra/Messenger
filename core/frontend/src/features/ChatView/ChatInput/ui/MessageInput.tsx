import { Textarea } from "@mantine/core"

interface IMessageInputProps{
    inputValue:string
    setInputValue:(value:string) => void
}

export const MessageInput:React.FC<IMessageInputProps> = ({inputValue,setInputValue}) => {
    return (
        <Textarea
            maxRows={8}
            maxLength={1500}
            autosize
            w='100%'
            placeholder="Write a message..."
            variant="unstyled"
            value={inputValue}
            onChange={(event:any) => setInputValue(event.currentTarget.value)}
        />
    )
}