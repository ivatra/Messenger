import { Textarea } from "@mantine/core"

interface IMessageInputProps{
    inputValue:string
    focusRef:any
    setInputValue:(value:string) => void
}

export const MessageInput:React.FC<IMessageInputProps> = ({inputValue,setInputValue,focusRef}) => {
    return (
        <Textarea
            ref = {focusRef}
            maxRows={8}
            autosize
            size = 'md'
            maxLength={1500}
            w='100%'
            placeholder="Write a message..."
            variant="unstyled"
            value={inputValue}
            onChange={(event:any) => setInputValue(event.currentTarget.value)}
        />
    )
}