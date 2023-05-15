import { BrowserRouter } from 'react-router-dom';

import AuthenticatedRoutes from './AuthenticatedRoutes';
import NotAuthorizedRoutes from './NotAuthorizedRoutes';
import ActivationRoutes from './ActivationRoutes';

import { useUserStore } from '../../../entities';


export const AppRoutes = () => {
    const { isAuth, isActivated } = useUserStore()

    return (
        <BrowserRouter>
            {isAuth && isActivated
                ? <AuthenticatedRoutes />
                : isAuth && !isActivated
                    ? <ActivationRoutes />
                    : <NotAuthorizedRoutes />
            }
        </BrowserRouter>
    );
};
