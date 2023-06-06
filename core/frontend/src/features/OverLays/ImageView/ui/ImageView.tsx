import { Modal, Text,Image } from "@mantine/core"
import { useMessageStore } from "../../../../entities"
import { SharedConsts } from "../../../../shared"




export const ImageView = () => {


    const { disableImageView, isImageViewEnabled,currentImage } = useMessageStore()

    if(!currentImage){
        disableImageView()
        return <></>
    }
    
    const src = currentImage.startsWith('blob:') ? currentImage : SharedConsts.IMAGES_URL + currentImage
    return (
        <Modal centered opened={isImageViewEnabled} onClose={disableImageView} radius='lg' >
            <Image mah = '100%' w = '100%' src={src}/>
        </Modal>
    )
}