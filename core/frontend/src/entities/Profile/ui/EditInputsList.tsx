import { useRef, useState } from "react";

import { Stack } from "@mantine/core";
import { useDidUpdate } from "@mantine/hooks";

import { EditInputProps } from "../model/EditInputProps";
import { UpdateProfileParams } from "../types/ProfileStoreType";
import { BaseEditInput } from "./BaseEditInput";

import { SharedHooks, SharedUi } from "../../../shared";
import { useProfileStore } from "../store/ProfileStore";

type IOutcomeIcons = {
    [key in ProfileFields]?: JSX.Element;
};

export const EditInputsList = () => {
    const stackRef = useRef<HTMLDivElement>(null)

    const { profile, updateProfile, state } = useProfileStore();
    const [fieldUpdated, setFieldUpdated] = useState<string>("");
    const [outcomeIcons, setOutcomeIcons] = useState<IOutcomeIcons>({});

    const editUserField = async ({ field, value }: UpdateProfileParams) => {
        setFieldUpdated(field);
        await updateProfile(field, value);
    };

    SharedHooks.useNavigationByArrows({ parentRef: stackRef, tolerance: 15 })

    useDidUpdate(() => {
        var iconOnUpdate: JSX.Element;
        if (state === 'error') iconOnUpdate = SharedUi.errorIcon;
        else if (state === 'loading') iconOnUpdate = SharedUi.loaderIcon;
        else iconOnUpdate = SharedUi.successIcon;

        setOutcomeIcons((prevState) => ({
            ...prevState,
            [fieldUpdated]: iconOnUpdate,
        }));

    }, [state]);

    return (
        <Stack ref={stackRef}>
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
