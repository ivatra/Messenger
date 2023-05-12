import { Navigate, Route, Routes } from 'react-router-dom';

import { ChattingPage } from '../../../pages/Chatting';
import { AccountActivation } from '../../../pages';

const AuthenticatedRoutes = () => {
    return (
        <Routes>
            <Route
                Component={ChattingPage}
                path="/chat">
                <Route
                    Component={ChattingPage}
                    path=":chatId" />
            </Route>
            <Route path="/activate/:activationLink" Component={AccountActivation} />
            <Route path="*" element={<Navigate to="/chat" />} />
        </Routes>
    );
};

export default AuthenticatedRoutes;
