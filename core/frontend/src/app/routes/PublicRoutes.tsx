import { Route, Routes } from 'react-router-dom';

import { AccountActivation } from '../../pages';


const PublicRoutes = () => {
    return (
        <Routes >
            <Route path="activate/:activationLink" Component={AccountActivation} />
        </Routes>
    );
};

export default PublicRoutes;
