import { SharedConsts } from "../../../shared"
import { Image } from "@mantine/core"


interface IProps {
    url: string
    onClick: () => void

}
export const ImagePreview = ({ url, onClick: openImageView }: IProps) => {
    const src = url.startsWith('blob:') ? url : SharedConsts.IMAGES_URL + url

    return (
    <Image
        onClick={openImageView}
        sx = {{":hover":{
            cursor:'pointer'
        }}}
        style={{ alignSelf: 'center' }}
        maw='400px'
        h='250px'
        fit='cover'
        src={src} />
)
}