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
import MobileSignIn from './component/mobile/MobileSignIn/MobileSignIn';
import MobileSignUp from './component/mobile/MobileSignUp/MobileSignUp';
import ComingSoon from './animation/ComingSoon/ComingSoon';

import MobileNewsPage from './component/mobile/mobile_widgets/MobileNewsPage/MobileNewsPage';

import axios from 'axios';

import thumbnail_1 from './component/mobile/mobile_assets/thumbnails/1.png'
import thumbnail_2 from './component/mobile/mobile_assets/thumbnails/2.jpg'
import thumbnail_3 from './component/mobile/mobile_assets/thumbnails/3.jpg'
import MobileSettingsLanguage from './component/mobile/MobileSettingsLanguage/MobileSettingsLanguage';

const App = () => {

    const { setLayoutWidth, windowLayout } = useVisualStore()



    useEffect(() => {
        setLayoutWidth(window.innerWidth)
        console.log(window.innerWidth)
    }, [])


    return (
        <>
        

            {windowLayout.width > 750 && <BrowserRouter>
                <Routes>
                    {/* Основной layout с Header + Sidebar */}
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<Main />} />
                        <Route path="/document-generation" element={<DocumentGeneration />} />
                        <Route path="/info" element={<ComingSoon />} />
                        <Route path="/pro" element={<ComingSoon />} />
                    </Route>

                    {/* Auth layout без Header и Sidebar */}
                    <Route element={<AuthLayout />}>
                        <Route path="/sign-up" element={<SignUp />} />
                        <Route path="/sign-in" element={<SignIn />} />
                    </Route>
                </Routes>
            </BrowserRouter>}

            {windowLayout.width <= 750 && 

            <BrowserRouter>
            
                <Routes>
                    <Route path='*' element={<Main />} />
                    <Route path='/sign-in' element={<MobileSignIn />} />
                    <Route path='/sign-up' element={<MobileSignUp />} />

                    <Route path='/legal/public' element={<MobileSignUp />} />



                    <Route path='/news'>
                        <Route path='/news/1' element={<MobileNewsPage

                            thumbnail={thumbnail_1}
                            newsTitle={'LEG AI BETA: ДОБРО ПОЖАЛОВАТЬ В БЕТА ТЕСТ'}
                            date={'15.05.2025'}
                            textTitle={'Вот определение статьи АК 47'}
                            textParagraph={[
                                'Lorem ipsum dolor sit amet consectetur. Tincidunt vitae eget tristique interdum nulla in. Nunc ut at massa augue euismod tristique lacus risus est. Consectetur egestas lectus nulla metus. Tristique justo pharetra ut augue cursus.',
                                'Lorem ipsum dolor sit amet consectetur. Tincidunt vitae eget tristique interdum nulla in. Nunc ut at massa augue euismod tristique lacus risus est. Consectetur egestas lectus nulla metus. Tristique justo pharetra ut augue cursus.',
                                'Lorem ipsum dolor sit amet consectetur. Tincidunt vitae eget tristique interdum nulla in. Nunc ut at massa augue euismod tristique lacus risus est. Consectetur egestas lectus nulla metus. Tristique justo pharetra ut augue cursus.',
                            ]} 
                        />} />


                        <Route path='/news/2' element={<MobileNewsPage

                            thumbnail={thumbnail_2}
                            newsTitle={'LEG AI BETA: ДОБРО ПОЖАЛОВАТЬ В БЕТА ТЕСТ'}
                            date={'15.05.2025'}
                            textTitle={'Вот определение статьи АК 47'}
                            textParagraph={[
                                'Lorem ipsum dolor sit amet consectetur. Tincidunt vitae eget tristique interdum nulla in. Nunc ut at massa augue euismod tristique lacus risus est. Consectetur egestas lectus nulla metus. Tristique justo pharetra ut augue cursus.',
                                'Lorem ipsum dolor sit amet consectetur. Tincidunt vitae eget tristique interdum nulla in. Nunc ut at massa augue euismod tristique lacus risus est. Consectetur egestas lectus nulla metus. Tristique justo pharetra ut augue cursus.',
                                'Lorem ipsum dolor sit amet consectetur. Tincidunt vitae eget tristique interdum nulla in. Nunc ut at massa augue euismod tristique lacus risus est. Consectetur egestas lectus nulla metus. Tristique justo pharetra ut augue cursus.',
                            ]} 
                        />} />

                        <Route path='/news/3' element={<MobileNewsPage

                            thumbnail={thumbnail_3}
                            newsTitle={'ВОТ ОПРЕДЕЛЕНИЕ СТАТЬИ АК 47'}
                            date={'15.05.2025'}
                            textTitle={'Вот определение статьи АК 47'}
                            textParagraph={[
                                'Lorem ipsum dolor sit amet consectetur. Tincidunt vitae eget tristique interdum nulla in. Nunc ut at massa augue euismod tristique lacus risus est. Consectetur egestas lectus nulla metus. Tristique justo pharetra ut augue cursus.',
                                'Lorem ipsum dolor sit amet consectetur. Tincidunt vitae eget tristique interdum nulla in. Nunc ut at massa augue euismod tristique lacus risus est. Consectetur egestas lectus nulla metus. Tristique justo pharetra ut augue cursus.',
                                'Lorem ipsum dolor sit amet consectetur. Tincidunt vitae eget tristique interdum nulla in. Nunc ut at massa augue euismod tristique lacus risus est. Consectetur egestas lectus nulla metus. Tristique justo pharetra ut augue cursus.',
                            ]} 
                        />} />
                    </Route>
                        
                    <Route path='/options'>
                        <Route path='/options/language' element={<MobileSettingsLanguage />} />
                        <Route path='/options/chats' element={<MobileSignUp />} />
                        <Route path='/options/explain' element={<MobileSignUp />} />
                        <Route path='/options/account' element={<MobileSignUp />} />
                    </Route>


                    
                </Routes>
                {/* ROUTING ВНУТРИ */}
            
            </BrowserRouter>
            }

        </>

    );
};

export default App;
