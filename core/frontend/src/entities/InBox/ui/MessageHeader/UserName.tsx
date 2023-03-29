import { Text } from "@mantine/core";


interface IUserName{
    name:string
}

export const UserName:React.FC<IUserName> = ({name}) => (
    <Text lineClamp={1} size={'sm'}>{name}</Text>
);
