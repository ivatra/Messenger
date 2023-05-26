import { Button, ButtonProps } from "@mantine/core"

interface IProps {
    onClick: () => void
    title:string
}

export const CC_Button: React.FC<IProps> = ({ onClick,title }) => {

    const buttonProps: ButtonProps = {
        size: 'sm',
        variant:'light'

    }
    return (
        <Button {...buttonProps} onClick={onClick}>
            {title}
        </Button>
    )

}