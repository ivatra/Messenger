import { HTMLInputTypeAttribute } from "react";

import { IconPencil, IconLock, IconPhoto, IconPhotoEdit, IconEdit } from "@tabler/icons-react";

import { IProfile } from "../types/ProfileModel";

export interface IEditInputs {
    field: Omit<keyof IProfile,'id'>
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