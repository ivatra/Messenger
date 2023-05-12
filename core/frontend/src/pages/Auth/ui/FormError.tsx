import React from 'react';
import { Text } from '@mantine/core';

interface FormErrorProps {
    error: string | null;
}

export const FormError: React.FC<FormErrorProps> = ({ error }) => {
    return (
        error ? (
            <Text color="red" size="sm" mt="sm">
                {error}
            </Text>  )
            : (<></>)
        )
};