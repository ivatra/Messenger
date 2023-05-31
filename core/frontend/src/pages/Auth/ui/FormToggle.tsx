import React from 'react';

import { Group, Anchor, Button } from '@mantine/core';

interface FormToggleProps {
    formType: 'register' | 'login';
    toggleFormType: () => void;
    handleSubmit:() => void
}

export const FormToggle: React.FC<FormToggleProps> = ({ formType, toggleFormType, handleSubmit }) => {

    return (
        <Group position="apart" mt="xl">
            <Anchor
                component="button"
                type="button"
                color="dimmed"
                onClick={toggleFormType}
                size="sm">
                {formType === 'register'
                    ? 'Have an account? Login'
                    : "Don't have an account? Register"}
            </Anchor>

            <Button color="blue" type="submit" onClick={handleSubmit} >
                {formType === 'register' ? 'Register' : 'Login'}
            </Button>
        </Group>
    );
};