import { useRef, useState } from "react";

import { Stack } from "@mantine/core";
import { useDidUpdate } from "@mantine/hooks";

import { EditInputProps } from "../model/EditInputProps";
import { UpdateProfileParams, ProfileFields } from "../types/Store";
import { useUserStore } from "..";
import { BaseEditInput } from "./BaseEditInput";

import { SharedHooks, SharedUi } from "../../../shared";

type IOutcomeIcons = {
    [key in ProfileFields]?: JSX.Element;
};

export const EditInputsList = () => {
    const stackRef = useRef<HTMLDivElement>(null)
    
    const { profile, updateProfile, isError, isLoading } = useUserStore();
    const [fieldUpdated, setFieldUpdated] = useState<string>("");
    const [outcomeIcons, setOutcomeIcons] = useState<IOutcomeIcons>({});

    const editUserField = async ({ field, value }: UpdateProfileParams) => {
        setFieldUpdated(field);
        await updateProfile(field, value);
    };

    SharedHooks.useNavigationByArrows({parentRef:stackRef,tolerance:15})

    useDidUpdate(() => {
        var iconOnUpdate: JSX.Element;
        if (isError) iconOnUpdate = SharedUi.errorIcon;
        else if (isLoading) iconOnUpdate = SharedUi.loaderIcon;
        else iconOnUpdate = SharedUi.successIcon;

        setOutcomeIcons((prevState) => ({
            ...prevState,
            [fieldUpdated]: iconOnUpdate,
        }));

    }, [isLoading, isError]);

    return (
        <Stack ref = {stackRef}>
            {EditInputProps.map((Input) => (
                <BaseEditInput
                    key={Input.field}
                    props={Input}
                    profile={profile}
                    onSubmit={editUserField}
                    outcomeIcon={outcomeIcons[Input.field]}
                />
            ))}
        </Stack>
    );
};
