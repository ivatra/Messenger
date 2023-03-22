import { useState } from "react";

import { Stack } from "@mantine/core";
import { useDidUpdate } from "@mantine/hooks";

import { EditInputProps } from "../model/EditInputProps";
import { UpdateProfileParams, ProfileFields } from "../types/Store";
import { useUserStore } from "..";
import { errorIcon, loaderIcon, successIcon } from "../../../shared";
import { BaseEditInput } from "./BaseEditInput";


type IOutcomeIcons = {
    [key in ProfileFields]?: JSX.Element;
};

export const EditInputsList = () => {
    const { profile,updateProfile, isError, isLoading } = useUserStore();
    const [fieldUpdated, setFieldUpdated] = useState<string>("");
    const [outcomeIcons, setOutcomeIcons] = useState<IOutcomeIcons>({});

    const editUserField = async ({ field, value }: UpdateProfileParams) => {
        setFieldUpdated(field);
        await updateProfile(field, value);
    };

    useDidUpdate(() => {
        var iconOnUpdate: JSX.Element;
        console.log(isError + 'iserror')
        if (isError) iconOnUpdate = errorIcon;
        else if (isLoading) iconOnUpdate = loaderIcon;
        else iconOnUpdate = successIcon;

        setOutcomeIcons((prevState) => ({
            ...prevState,
            [fieldUpdated]: iconOnUpdate,
        }));

    }, [isLoading, isError]);

    return (
        <Stack>
            {EditInputProps.map((Input) => (
                <BaseEditInput
                    key={Input.field}
                    props = {Input}
                    profile={profile}
                    onSubmit={editUserField}
                    outcomeIcon={outcomeIcons[Input.field]}
                />
            ))}
        </Stack>
    );
};