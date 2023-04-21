import React, { MouseEvent } from 'react';
import { DefaultMantineColor, Text } from '@mantine/core';

interface UnderlinedTextButtonProps {
    children: any;
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    color: DefaultMantineColor;
    onClick: () => void;
}

export const UnderlinedTextButton: React.FC<UnderlinedTextButtonProps> = ({ children, size, color: textColor, onClick }) => {
    const styles = {
        base: {
            cursor: 'pointer',
            color: textColor,
        },
        hover: {
            textDecoration: 'underline',
        },
    };

    const handleMouseEnter = (e: MouseEvent<HTMLSpanElement>) => {
        e.currentTarget.style.textDecoration = styles.hover.textDecoration;
    };

    const handleMouseLeave = (e: MouseEvent<HTMLSpanElement>) => {
        e.currentTarget.style.textDecoration = 'none';
    };

    return (
        <Text
            size={size}
            style={styles.base}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            role='button'
            tabIndex={0}
            onClick={onClick}
        >
            {children}
        </Text>
    );
};