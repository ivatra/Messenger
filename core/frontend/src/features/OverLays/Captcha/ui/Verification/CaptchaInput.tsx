import {
    TextInput,
    Group
} from "@mantine/core";
import { textInputProps } from "./Verification";

export const CaptchaInput = ({
    input, inputErr, setInput, captchaInputRef,
}: {
    input: string;
    inputErr: string;
    setInput: (value: string) => void;
    captchaInputRef: React.RefObject<HTMLInputElement>;
}) => (
    <Group noWrap spacing="xs">
        <TextInput
            value={input}
            error={inputErr}
            onChange={(e) => setInput(e.currentTarget.value)}
            ref={captchaInputRef}
            data-autofocus
            {...textInputProps} />
    </Group>
);
