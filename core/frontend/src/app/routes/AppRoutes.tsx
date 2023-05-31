import { BrowserRouter } from 'react-router-dom';

import AuthenticatedRoutes from './AuthenticatedRoutes';
import NotAuthorizedRoutes from './NotAuthorizedRoutes';
import ActivationRoutes from './ActivationRoutes';

import { useProfileStore } from '../../entities';


export const AppRoutes = () => {
    const { isAuth, isActivated } = useProfileStore()

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
