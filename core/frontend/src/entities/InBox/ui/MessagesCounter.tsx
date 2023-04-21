import { ColorSwatch, ColorSwatchProps, Text } from "@mantine/core";


interface IMessageCounter {
    count: number
}

export const MessagesCounter: React.FC<IMessageCounter> = ({ count }) => {

    const colorSwatchProps:ColorSwatchProps = {
        radius:'xl',
        size:'1.1rem',
        color:'#4d5762'
    }

    return (
    <ColorSwatch {...colorSwatchProps}>
        <Text size='0.6rem' c={'white'}>
            {count}
        </Text>
    </ColorSwatch>
    );
}
