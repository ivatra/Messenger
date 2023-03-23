import { Button} from "@mantine/core";


interface IResignButton {
    resignFunc: () => void
}

export const ResignButton: React.FC<IResignButton> = ({ resignFunc }) => {

    const buttonProps = {
        variant: 'outline',
        sx: { alignSelf: 'flex-end' },
        onClick: resignFunc
    }

    return (
        <Button {...buttonProps}>
            Log in
        </Button>
    );
}
