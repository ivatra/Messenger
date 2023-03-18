import {
    ActionIcon,
    Loader
} from "@mantine/core";
import { IconReload } from "@tabler/icons-react";

export const ReloadButton = ({ isLoading, reloadCaptcha }: { isLoading: boolean; reloadCaptcha: () => void; }) => (
    isLoading ? (
        <Loader size="xs" />
    ) : (
        <ActionIcon size={'sm'} onClick={reloadCaptcha}>
            <IconReload />
        </ActionIcon>
    )
);
