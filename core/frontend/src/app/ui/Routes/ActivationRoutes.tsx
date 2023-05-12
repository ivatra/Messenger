import { Navigate, Route, Routes } from 'react-router-dom';

import { EmailActivationHint } from '../../../features';
import { AccountActivation } from '../../../pages';


const ActivationRoutes: React.FC = () => (
    <Routes>
        <Route
            path="/activation"
            Component={EmailActivationHint} />
        <Route path="/activate/:activationLink" Component={AccountActivation} />
        <Route
            path="*"
            element={<Navigate to="/activation" />} />

    </Routes>
);

export default ActivationRoutes;
