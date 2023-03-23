import { Radio, Stack } from "@mantine/core";

interface RadioButtonGroupProps {
    userChoice: string;
    setUserChoice: (choice: string) => void;
}

export const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
    userChoice, setUserChoice,
}) => (
    <Radio.Group value={userChoice} onChange={setUserChoice} size="md">
        <Stack>
            <Radio value="human" label="Human" />
            <Radio
                color="red"
                error={userChoice === "robot" && "Wrong answer"}
                value="robot"
                label="Robot" />
        </Stack>
    </Radio.Group>
);
