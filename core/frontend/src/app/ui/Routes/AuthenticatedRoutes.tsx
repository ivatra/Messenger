import { Route, Navigate, Routes } from 'react-router-dom';

import {Text} from "@mantine/core"

import { ChattingPage } from '../../../pages/Chatting';

const AuthenticatedRoutes = () => {
    return (
        <Routes>
            <Route
                path="/"
                index
                element={<Navigate to="/chat" />} />
            <Route
                Component={ChattingPage}
                path="/chat">
                <Route
                    Component={ChattingPage}
                    path=":chatId" />
            </Route>
            <Route path="*" element={<Text size='xl'>Not found</Text>} />
        </Routes>
    );
};

export default AuthenticatedRoutes;
