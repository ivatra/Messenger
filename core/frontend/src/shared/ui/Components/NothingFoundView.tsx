import { Text, TextProps } from "@mantine/core";


interface NothingFoundTextProps {
    searchValue: string
}

const textProps: TextProps = {
    display: 'flex',
    style: {
        justifySelf: "center",
        alignSelf: "center",
    },
    h: "100%",
}

export const NothingFoundView: React.FC<NothingFoundTextProps> = ({ searchValue }) => (
    <Text {...textProps}>
        No results found for {searchValue}
    </Text>
);
