import { Button } from "@mantine/core";

interface ProveButtonProps {
    userChoice: string;
    onPass: () => void;
}
export const ProveButton: React.FC<ProveButtonProps> = ({ userChoice, onPass }) => (
    userChoice === "human" ? (
        <Button
            variant="outline"
            sx={{ alignSelf: "flex-end" }}
            onClick={onPass}
        >
            Prove it
        </Button>
    ) : <></>
)

