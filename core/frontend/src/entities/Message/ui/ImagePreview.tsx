import { SharedConsts } from "../../../shared"
import { Image } from "@mantine/core"


interface IProps {
    url: string
    height?:string
    onClick: () => void

}
export const ImagePreview = ({ url, onClick: openImageView,height = '250px' }: IProps) => {
    const src = url.startsWith('blob:') ? url : SharedConsts.IMAGES_URL + url

    return (
    <Image
        onClick={openImageView}
        sx = {{":hover":{
            cursor:'pointer'
        }}}
        style={{ alignSelf: 'center' }}
        maw='400px'
        h = {'100%'}
        fit='cover'
        src={src} />
)
}