import { Group, GroupProps } from "@mantine/core"
import { DropzoneReject } from "./DropzoneReject"
import { DropzoneAccept } from "./DropzoneAccept"


const groupProps: GroupProps = {
    top: '30%',
    left: 0,
    position: 'center',
    pos: 'relative',
    w: '100%',
    h: '30%',
    spacing: 'xs'
}

interface IImageDropzoneBodyProps {
    isDraging: boolean
}


export const ImageDropzoneBody: React.FC<IImageDropzoneBodyProps> = ({ isDraging }) => {

    return (
        <Group {...groupProps} display={isDraging ? 'flex' : 'none'} noWrap>
            <DropzoneReject />
            <DropzoneAccept/>
        </Group>
    )


}