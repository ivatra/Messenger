import { Text } from "@mantine/core";


interface IDateProps {
    messageSentDate: string
}

export const Date: React.FC<IDateProps> = ({ messageSentDate }) => (
    <Text color="dark.2" size='10px' style={{whiteSpace:'nowrap'}}>{messageSentDate}</Text>
);
