import { useState, useEffect, useRef, useCallback } from "react";
import { Modal, Stack,} from "@mantine/core";

import useCaptchaStore from "../../store/CaptchaStore";
import { ReloadButton } from "./ReloadButton";
import { CaptchaInput } from "./CaptchaInput";
import { CaptchaSvg } from "./CaptchaSvg";

interface IVerification {
    setCaptcha: (value: boolean) => void;
}

const modalProps = {
    opened: true,
    centered: true,
    closeOnClickOutside: false,
    radius: "md",
    keepMounted: false,
    padding: 0,
    size: "xs",
    withCloseButton: false,
};

export const textInputProps = {
    w: "80%",
    placeholder: "Type the text",
    variant: "default",
};

const closeButtonProps = {
    size: "md",
    mr: "0.3rem",
    sx: { alignSelf: "self-end" },
};

const Verification: React.FC<IVerification> = ({ setCaptcha }) => {
    const { svgData, verifyAnswer, receiveCaptcha, isLoading } = useCaptchaStore();
    const captchaInputRef = useRef<HTMLInputElement>(null);
    const [input, setInput] = useState("");
    const [inputErr, setInputErr] = useState("");

    useEffect(() => {
        reloadCaptcha();
    }, []);

    useEffect(() => {
        if (input.length <= 5) {
            setInputErr("");
            if (input.length === 5) {
                verifyAnswer(input);
            }
        } else {
            setInputErr("Hold on, too much symbols");
        }
    }, [input]);

    const reloadCaptcha = () => {
        receiveCaptcha();
        captchaInputRef?.current?.focus();
    };

    return (
        <Modal onClose={() => setCaptcha(false)} {...modalProps}>
            <Stack spacing={0} p="sm">
                <Modal.CloseButton {...closeButtonProps} />
                <Stack m="sm" spacing="md">
                    <CaptchaSvg svgData={svgData} />
                    <CaptchaInput
                        input={input}
                        inputErr={inputErr}
                        setInput={setInput}
                        captchaInputRef={captchaInputRef}
                    />
                    <ReloadButton isLoading={isLoading} reloadCaptcha={reloadCaptcha} />
                </Stack>
            </Stack>
        </Modal>
    );
};

export default Verification;
