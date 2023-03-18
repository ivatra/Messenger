import { EditInputProps } from "../model/EditInputProps";
import { EditInput } from "./EditInput";
import { UpdateProfileParams, ProfileFields } from "../types/Store";
import { Stack } from "@mantine/core";
import { useUserStore } from "..";
import { useState } from "react";
import { useDidUpdate } from "@mantine/hooks";
import { errorIcon, loaderIcon, successIcon } from "../../../shared";


type IOutcomeIcons = {
    [key in ProfileFields]?: JSX.Element;
};

export const EditInputsList = () => {
    const { profile, updateProfile, isError, isLoading } = useUserStore();
    const [fieldUpdated, setFieldUpdated] = useState<string>("");
    const [outcomeIcons, setOutcomeIcons] = useState <IOutcomeIcons>({});

    const editUserField = async ({ field, value }: UpdateProfileParams) => {
        setFieldUpdated(field);
        await updateProfile(field, value);
    };

    useDidUpdate(() => {
        var iconOnUpdate: JSX.Element;

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
            {EditInputProps.map((Input) => {
                const placeholder: ProfileFields = Input.field in profile
                    ? (profile as Record<typeof Input.field, any>)[Input.field]
                    : Input.customPlaceHolder;

                return (
                    <EditInput
                        key={Input.field}
                        {...Input}
                        onSubmit={editUserField}
                        placeholder={placeholder}
                        outcomeIcon={outcomeIcons[Input.field]} // pass the corresponding icon
                    />
                );
            })}
        </Stack>
    );
};
