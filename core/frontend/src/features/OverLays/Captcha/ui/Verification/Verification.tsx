import { useState, useEffect, useRef } from "react";
import { Group, Modal, Stack } from "@mantine/core";

import { useCaptchaStore } from "../../store/CaptchaStore";
import { ReloadButton } from "./ReloadButton";
import { CaptchaInput } from "./CaptchaInput";
import { CaptchaSvg } from "./CaptchaSvg";

interface IVerification {
    setCaptcha: (value: boolean) => void;
}

const modalProps = {
    opened: true,
    zIndex: 800,
    size: '15.2rem',
    display: 'flex',
    centered: true,
    closeOnClickOutside: false,
    radius: "md",
    keepMounted: false,
    padding: 0,
    withCloseButton: false,
};


const closeButtonProps = {
    mt: "0.1rem",
    mr: "0.1rem",
    sx: { alignSelf: "self-end" },
};

const Verification: React.FC<IVerification> = ({ setCaptcha }) => {
    const { svgData, verifyAnswer, receiveCaptcha, state } = useCaptchaStore();
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
            <Stack spacing={0} m={'xs'}>
                <Modal.CloseButton {...closeButtonProps} />
                <Stack m="sm" spacing="xs" >
                    <CaptchaSvg svgData={svgData} />
                    <Group noWrap spacing="xs" align="center">
                        <ReloadButton isLoading={state === 'loading'} reloadCaptcha={reloadCaptcha} />
                        <CaptchaInput
                            input={input}
                            inputErr={inputErr}
                            setInput={setInput}
                            captchaInputRef={captchaInputRef}
                        />
                    </Group>
                </Stack>
            </Stack>
        </Modal>
    );
}

export default Verification;
