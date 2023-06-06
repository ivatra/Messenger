import { Box, Col, Grid, Modal, ScrollArea } from "@mantine/core"

import { useChatStore, useMessageStore } from "../../../../entities"
import { ImagePreview } from "../../../../entities/Message/ui/ImagePreview"
import { useEffect, useRef } from "react"
import { NothingFoundView } from "../../../../shared/ui"
import { useDidUpdate } from "@mantine/hooks"




export const AttachementsView = () => {
    const ref = useRef<HTMLDivElement>(null)
    const { isAttachementViewOpened, setAttachementViewOpened, currentChatId } = useChatStore()
    const { receiveAttachments, attachments, setImageViewEnabled } = useMessageStore()


    useEffect(() => {
        if (!attachments[currentChatId] || attachments[currentChatId].hasMore) {
            receiveAttachments(currentChatId, 100)
        }
    }, [])



    const onAttachementClick = (url: string) => {
        setImageViewEnabled(url)
    }

    return (
        <Modal opened={isAttachementViewOpened} onClose={() => setAttachementViewOpened(false)} size='md' centered radius='xl'>
            <Box h='600px' w='100%'>
                {!attachments[currentChatId] || !attachments[currentChatId].attachments.length ?
                    <NothingFoundView subject="attachements" />
                    : <ScrollArea viewportRef={ref} h='100%' w='100%'>
                        <Grid columns={3} w = '100%' grow>
                            {attachments[currentChatId].attachments.map((attach) => {
                                return (
                                    <Col span={1} key = {attach.id}>
                                        <ImagePreview
                                            height="100%"
                                            url={attach.attachement.url}
                                            onClick={() => onAttachementClick(attach.attachement.url)} />
                                    </Col>
                                )

                            })}
                        </Grid>
                    </ScrollArea>
                }
            </Box>
        </Modal>
    )
}