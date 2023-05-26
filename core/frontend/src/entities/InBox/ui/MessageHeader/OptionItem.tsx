import { MantineSize, Menu, Text } from "@mantine/core";
import { SharedTypes } from "../../../../shared";

interface IProps {
    onClick: (e:any) => void;
    size: MantineSize;
    label: string;
    Icon: SharedTypes.ITablerIcon;
}

export const OptionItem: React.FC<IProps> = ({ Icon, onClick, size, label }) => {
    const icon = <Icon size={`calc(${size} + 0.5rem)`}/>;

    return (
        <Menu.Item onClick={onClick} icon={icon}>
            <Text size={size}>{label}</Text>
        </Menu.Item>
    );

};
