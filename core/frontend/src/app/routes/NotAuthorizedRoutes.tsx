import { Navigate, Route, Routes } from 'react-router-dom';

import { AccountActivation, AuthenticationPage } from '../../pages';



const NotAuthorizedRoutes = () => {
    return (
        <Routes>
            <Route path="/auth" Component={AuthenticationPage} />
            <Route path="/activate/:activationLink" Component={AccountActivation} />
            <Route path="*" element={<Navigate to="/auth" />} />
        </Routes>
    );
};

export default NotAuthorizedRoutes;
