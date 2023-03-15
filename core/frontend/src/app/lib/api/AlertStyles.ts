import { NotificationProps } from "@mantine/notifications";


interface AlertStyleProps {
    [key: number]: Omit<NotificationProps, 'message'> & {
        title: string;
    };
}

const AlertStyles:AlertStyleProps = {
    500:{
        withCloseButton: true,
        title: "There was an internal error",
        color: 'blue',
        loading: false,
    },
    403:{
        withCloseButton: true,
        title: "There was an internal error",
        color: 'red',
        loading: false,

    },
    400:{
        withCloseButton: true,
        title: "There was an error about bad request",
        color: 'red',
        loading: false,
    },
    401:{
        withCloseButton: true,
        title: "Your session is expired",
        color: 'dark',
        loading: false,
    }

}
export default AlertStyles