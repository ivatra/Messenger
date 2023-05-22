import React from 'react';
import { Paper, Text, Kbd } from '@mantine/core';

export interface NavigationHintProps {
    navigateButton: string;
}

export const NavigationHint: React.FC<NavigationHintProps> = ({ navigateButton }) => (
    <Paper display='flex' bg='inherit'>
        <Text style={{ alignSelf: 'center' }} size='sm'>
            Press <Kbd>{navigateButton}</Kbd> to manage navigation amongst form
        </Text>
    </Paper>
);