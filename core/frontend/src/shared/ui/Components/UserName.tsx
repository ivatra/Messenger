import { MantineNumberSize, Text } from "@mantine/core";


interface IUserName{
    name:string
    nameSize?:MantineNumberSize
}

export const UserName: React.FC<IUserName> = ({ name, nameSize }) => (
    <Text lineClamp={1} size={nameSize || 'sm'}>{name}</Text>
);
