import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './component/Main/Main';
import DocumentGeneration from './component/DocumentGeneration/DocumentGeneration';
import SignUp from './component/SignUp/SignUp';
import SignIn from './component/SignIn/SignIn';
import MainLayout from './component/MainLayout';
import './App.css'
import AuthLayout from './component/AuthLayout';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Основной layout с Header + Sidebar */}
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Main />} />
                    <Route path="/document-generation" element={<DocumentGeneration />} />
                </Route>

                {/* Auth layout без Header и Sidebar */}
                <Route element={<AuthLayout />}>
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/sign-in" element={<SignIn />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
