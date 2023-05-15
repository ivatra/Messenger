import { notifications } from "@mantine/notifications";

import { AlertMessageStyles } from "../../../app/api/types/AlertStyles";


export const showAlertMessage = async (response: Response) => {
    const error = await response.json();
    notifications.show({
        ...AlertMessageStyles[response.status],
        message: error.message,
    });
};

export const showInternalErrorMessage = (message: string | undefined = undefined) => {
    notifications.show({
        ...AlertMessageStyles[500],
        message: message || 'Could access to server. Try again later.'
    });
};
