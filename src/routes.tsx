import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import SubmitPage from './pages/SubmitPage';
import MainLayout from './components/MainLayout';

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            <Route path="" element={<HomePage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="submit" element={<SubmitPage />} />
        </Route>
    ),
    {
        basename: import.meta.env.BASE_URL,
    }
);
