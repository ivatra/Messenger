import { IconEditCircle, IconPencil, IconLock, IconClockEdit } from "@tabler/icons-react";

import { ProfileFields} from "../types/Store";
import { iconBaseProps } from "../../../shared";

interface IEditInputs {
    field: ProfileFields
    label: string
    customPlaceHolder?:string
    PlaceholderIcon: React.ElementType
    SubmitInitialIcon: React.ElementType
}

function wrapInitialIcon(Icon: React.ElementType) {
    return <Icon { ...iconBaseProps } />
}

export const EditInputProps: IEditInputs[] = [
    {
        field: "name",
        label: "Name",
        PlaceholderIcon: IconPencil,
        SubmitInitialIcon: IconEditCircle,
    },
    {
        field: "login",
        label: "Login",
        PlaceholderIcon: IconPencil,
        SubmitInitialIcon: IconEditCircle,
    },
    {
        field: "password",
        label: "Password",
        customPlaceHolder: '...',
        PlaceholderIcon: IconLock,
        SubmitInitialIcon: IconEditCircle,
    },
]