import React, { useRef, useState } from 'react';

import { useForm } from '@mantine/form';
import { LoadingOverlay } from '@mantine/core';
import { useFocusTrap, useMergedRef } from '@mantine/hooks';

import { RegisterForm } from './RegisterForm';
import { LoginForm } from './LoginForm';
import { FormToggle } from './FormToggle';
import { AuthFrame } from './AuthFrame';

import { useProfileStore } from '../../../entities';
import { SharedHooks } from '../../../shared';

export interface IFormValues {
    name: string;
    login: string;
    email: string;
    password: string;
    confirmPassword: string;
    avatar: File | null;
    termsOfService: boolean;
}

//Store messages count in inbox
//make backend accept msgId as parameter
//

export const AuthenticationPage: React.FC = () => {
    const [formType, setFormType] = useState<'register' | 'login'>('register');

    const paperRef = useRef<HTMLFormElement>(null)
    const focusTrapRef = useFocusTrap(true)
    const mergedRef = useMergedRef(paperRef, focusTrapRef)

    const { state, register, login } = useProfileStore()

    const form = useForm<IFormValues>({
        initialValues: {
            name: '',
            login: '',
            email: '',
            password: '',
            confirmPassword: '',
            avatar: null,
            termsOfService: true,
        },
        validate: {
            email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : 'Invalid email'),
            name: (value) => (value.length < 5 ? 'Name must have at least 5 letters' : null),
            login: (value) => (value.length < 5 ? 'Login must have at least 5 letters' : null),
            confirmPassword: (value, values) =>
                value !== values.password ? 'Passwords does not match' : null,
            termsOfService: (value) => value === false ? 'You should agree with terms' : null
        },

    });

    const handleSubmit = () => {
        const {
            avatar,
            email,
            login: log,
            name,
            password } = form.values

        if (formType === 'register') {
            const { hasErrors } = form.validate()
            if (!hasErrors)
                register(name, log, email, password, avatar)

        } else {
            const fieldsValid = form.isValid('email') && form.isValid('password')
            if (fieldsValid)
                login(email, password)

        }
    }

    SharedHooks.useNavigationByArrows({ parentRef: paperRef, nodesReclusteringCause: formType })

    const updateFormType = () => setFormType((formType) => formType === 'register' ? 'login' : 'register')

    return (
        <AuthFrame>
            <form onSubmit={form.onSubmit(handleSubmit)} ref={mergedRef} >
                <LoadingOverlay visible={state === 'loading'} />
                {formType === 'register'
                    ? <RegisterForm form={form} />
                    : <LoginForm form={form} />
                }
                <FormToggle formType={formType} toggleFormType={updateFormType} handleSubmit={handleSubmit} />
            </form>
        </AuthFrame>

    );
};