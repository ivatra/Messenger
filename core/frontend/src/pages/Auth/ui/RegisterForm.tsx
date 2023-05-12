import React from 'react';

import { TextInput, PasswordInput, Group, Checkbox } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { IconLock, IconPhoto } from '@tabler/icons-react';

import { LoginForm } from './LoginForm';

import { IFormValues } from './AuthenticationPage';

import { EditFileInput } from '../../../shared';


interface RegisterFormProps {
    form: UseFormReturnType<IFormValues, (values: IFormValues) => IFormValues>;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ form }) => {
    const avatarValue = form.getInputProps('avatar').value
    
    const avatarPlaceHolder = avatarValue !== null
        ? avatarValue.name
        : 'Pick an image'

    return (
        <>
            <Group grow>
                <TextInput
                    data-autofocus
                    required
                    placeholder="Your name"
                    label="Name"
                    {...form.getInputProps('name')}
                />

                <TextInput
                    required
                    placeholder="Your login"
                    label="Login"
                    {...form.getInputProps('login')}
                />
            </Group>
            <LoginForm form={form} />
            <PasswordInput
                mt="md"
                required
                label="Confirm Password"
                placeholder="Confirm password" icon={<IconLock size={16} stroke={1.5} />}
                {...form.getInputProps('confirmPassword')} />

            <EditFileInput
                mt='md'
                placeholder={avatarPlaceHolder}
                label='Avatar'
                PlaceholderIcon={IconPhoto}
                value={avatarValue}
                setValue={form.getInputProps('avatar').onChange}
            />
            <Checkbox
                mt="xl"
                label="I agree to accept cookies and i consent to the processing of confidential data"
                {...form.getInputProps('termsOfService', { type: 'checkbox' })}
            />
        </>);
};