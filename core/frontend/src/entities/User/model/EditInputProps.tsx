import { IconEditCircle, IconPencil, IconLock, IconClockEdit, IconFileExport, IconFileUpload, IconPhoto, IconPhotoEdit, IconEdit } from "@tabler/icons-react";

import { ProfileFields } from "../types/Store";
import { HTMLInputTypeAttribute } from "react";

export interface IEditInputs {
    field: ProfileFields
    type:HTMLInputTypeAttribute
    customPlaceHolder?: string
    PlaceholderIcon: React.ElementType
    SubmitInitialIcon: React.ElementType
}

export const EditInputProps: IEditInputs[] = [
    {
        field: "name",
        type: 'text',
        PlaceholderIcon: IconPencil,
        SubmitInitialIcon: IconEdit,
    },
    {
        field: "login",
        type: 'text',
        PlaceholderIcon: IconPencil,
        SubmitInitialIcon: IconEdit,
    },
    {
        field: "password",
        type: 'password',
        customPlaceHolder: '.......',
        PlaceholderIcon: IconLock,
        SubmitInitialIcon: IconEdit,
    },
    {
        field: "avatar",
        type: "file",
        customPlaceHolder:'your-image.png',
        PlaceholderIcon: IconPhoto,
        SubmitInitialIcon: IconPhotoEdit
    },

]