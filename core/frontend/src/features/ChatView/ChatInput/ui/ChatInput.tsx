import React, { useContext, useRef, useState } from "react";

import { Box, MantineStyleSystemProps } from "@mantine/core";
import { FileWithPath } from "@mantine/dropzone";
import { useCounter, useDidUpdate } from "@mantine/hooks";

import { InputBody } from "./InputBody";
import { ImageDropzone } from "./Dropzone/ImageDropzone";
import { ImagePreview } from "./ImagePreview";


import { ChatContext } from "../../../../widgets";
import { useInboxStore, useMessageStore } from "../../../../entities";



interface IChatInputProps {
    parentHeight: number
    height: MantineStyleSystemProps['h']
    isDragging: boolean
    setIsDragging: (value: boolean) => void
    scrollListToBottom: any
}

export const ChatInput: React.FC<IChatInputProps> = ({ parentHeight, isDragging, setIsDragging, scrollListToBottom, height }) => {
    const openAttachementPickRef = useRef<() => void>(null);

    const [files, setFiles] = useState<FileWithPath[]>([]);
    const [isInboxChecked, setInboxChecked] = useState<boolean>(false)
    const [messageInput, setMessageInput] = useState<string>('')
    const [messageSending, setMessageSending] = useState<boolean>(false)

    const { sendMessage, isLoading, isError, increaseCommunicationMessagesTally } = useMessageStore()
    const { receiveByChat } = useInboxStore()

    const chat = useContext(ChatContext)


    useDidUpdate(() => {
        if (!isLoading && !isError && messageSending) {
            setMessageSending(false)
            scrollListToBottom()

            setMessageInput('')
            handleFileRemove()
        }
    }, [isLoading])

    const handleFileRemove = () => setFiles([])

    const handleMessageSend = () => {
        if (messageInput.length < 1) return

        if (!isInboxChecked) {
            const { inboxes, pinnedInboxes } = useInboxStore.getState()

            const isFound = inboxes.find((inbox) => inbox.chat.id === chat.id)
                || pinnedInboxes.find((inbox) => inbox.chat.id === chat.id)

            if (!isFound) receiveByChat(chat.id)

            setInboxChecked(true)
        }

        setMessageSending(true)
        increaseCommunicationMessagesTally(chat.id)
        sendMessage(chat.id, messageInput, files[0])
    }


    return (
        <Box>
            <ImageDropzone
                parentHeight={parentHeight}
                bottomOffset={60}
                display={isDragging ? 'flex' : 'none'}
                openRef={openAttachementPickRef}
                setFiles={setFiles}
                setIsDragging={setIsDragging}
            />
            <Box bg='dark.6'>
                <ImagePreview
                    file={files[0]}
                    removeImage={handleFileRemove} />
                <InputBody
                    attachementRef={openAttachementPickRef}
                    messageSending={isLoading && messageSending}
                    inputValue={messageInput}
                    sendMessage={handleMessageSend}
                    setInputValue={setMessageInput} />
            </Box>
        </Box>
    )
}