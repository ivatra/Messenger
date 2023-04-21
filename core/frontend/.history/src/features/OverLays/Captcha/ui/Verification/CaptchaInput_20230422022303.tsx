import {
    TextInput
} from "@mantine/core";


const textInputProps = {
    placeholder: "Type the text",
    variant: "default",
};
export const CaptchaInput = ({
    input, inputErr, setInput, captchaInputRef,
}: {
    input: string;
    inputErr: string;
    setInput: (value: string) => void;
    captchaInputRef: React.RefObject<HTMLInputElement>;
}) => (
    <TextInput
        value={input}
        error={inputErr}
        onChange={(e) => setInput(e.currentTarget.value)}
        ref={captchaInputRef}
        data-autofocus
        {...textInputProps} />
);
