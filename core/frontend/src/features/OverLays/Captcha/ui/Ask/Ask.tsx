import { Group, Modal, Stack, Text } from "@mantine/core";
import { useState } from "react";
import { RadioButtonGroup } from "./RadioButtonGroup";
import { ProveButton } from "./ProveButton";

const modalProps = {
    centered: true,
    withCloseButton: false,
    radius: "md",
    closeOnClickOutside: false,
    keepMounted: false,
    padding: "0.5rem",
    size: "xs",
};

const ModalTitle: React.FC = () => (
    <Group position="apart">
        <Modal.Title>
            <Text size="xl">Who are you?</Text>
        </Modal.Title>
        <Modal.CloseButton size="md" />
    </Group>
);


interface IAsk {
    setCaptcha: (value: boolean) => void;
    passAsk: (value: boolean) => void;
}


const Ask: React.FC<IAsk> = ({ setCaptcha, passAsk }) => {
    const [userChoice, setUserChoice] = useState<string>("human");
    const [isOpened, setOpened] = useState<boolean>(true);

    const onPass = () => {
        setOpened(false);
        passAsk(true);
    };
    return (
        <Modal
            onClose={() => setCaptcha(false)}
            opened={isOpened}
            {...modalProps}
        >
            <Stack m="md" spacing="lg">
                <ModalTitle />
                <RadioButtonGroup
                    userChoice={userChoice}
                    setUserChoice={setUserChoice}
                />
                <ProveButton userChoice={userChoice} onPass={onPass} />
            </Stack>
        </Modal>
    );
};

export default Ask;
