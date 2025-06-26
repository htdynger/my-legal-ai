import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './component/Main/Main';
import DocumentGeneration from './component/DocumentGeneration/DocumentGeneration';
import SignUp from './component/SignUp/SignUp';
import SignIn from './component/SignIn/SignIn';
import MainLayout from './component/MainLayout';
import './App.css'
import AuthLayout from './component/AuthLayout';

import { useVisualStore } from './store/useVisualStore';
import { useEffect } from 'react';

const App = () => {

    const { setLayoutWidth, windowLayout } = useVisualStore()

    useEffect(() => {
        setLayoutWidth(window.innerWidth)
        console.log(window.innerWidth)
    }, [])


    return (
        <>
        

            {windowLayout.width > 515 && <BrowserRouter>
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
            </BrowserRouter>}

            {windowLayout.width <= 515 && 

            <BrowserRouter>
            
                <Routes>
                    <Route path='*' element={<Main />} />
                </Routes>
                {/* ROUTING ВНУТРИ */}
            
            </BrowserRouter>
            }

        </>

    );
};

export default App;
