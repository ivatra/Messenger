import React from 'react';

import { TextInput, PasswordInput } from '@mantine/core';
import { IconAt, IconLock } from '@tabler/icons-react';
import { UseFormReturnType, useForm } from '@mantine/form'
import { IFormValues } from './AuthenticationPage';

interface LoginFormProps {
    form: UseFormReturnType<IFormValues, (values: IFormValues) => IFormValues>;
}

export const LoginForm: React.FC<LoginFormProps> = ({ form }) => {
    return (
        <>
            <TextInput
                mt="md"
                data-autofocus
                required
                placeholder="Your email"
                label="Email"
                icon={<IconAt size={16} stroke={1.5} />}
                {...form.getInputProps('email')}
            />

            <PasswordInput
                mt="md"
                required
                placeholder="Password"
                label="Password"
                icon={<IconLock size={16} stroke={1.5} />}
                {...form.getInputProps('password')}
            />
        </>
    );
};