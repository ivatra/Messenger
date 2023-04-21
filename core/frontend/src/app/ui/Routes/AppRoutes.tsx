import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Text } from "@mantine/core"

import AuthenticatedRoutes from './AuthenticatedRoutes';
import PublicRoutes from './PublicRoutes';

import { useUserStore } from '../../../entities';


export const AppRoutes = () => {
    const isAuth = useUserStore(state => state.isAuth)

    return (
        <BrowserRouter>
            {isAuth 
            ? <AuthenticatedRoutes /> : <PublicRoutes/>}
        </BrowserRouter>
    );
};
