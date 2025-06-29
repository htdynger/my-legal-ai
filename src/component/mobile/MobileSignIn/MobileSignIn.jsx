

import logoURL from './item/logo.png'
import appleIconURL from './item/appleIcon.png'
import googleIconURL from './item/googleIcon.png'

import eyeClosedURL from './item/eyeClosed.png'


import './style/LoginForm.css'
import './style/RecoverAccount.css'
import './style/PhoneVerification.css'
import './style/ChangePassword.css'
// import './SignIn.css'

import SuccessfulAuth from '../../SuccessfulAuth/SuccessfulAuth'

import { useVisualStore } from '../../../store/useVisualStore'

import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import AuthAnimatedFrame from '../../../animation/AuthAnimatedFrame/AuthAnimatedFrame'

import axios from 'axios'


const ChangePassword = ({ setVisiblePage }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(prev => !prev);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Новый пароль:", password);
        console.log("Подтверждение пароля:", confirmPassword);
        setVisiblePage('SuccessfulAuth');
    };

    return (
        <>
        <AuthAnimatedFrame />
        <section className="ChangePassword-app">

            <div className="section-1">
                <form onSubmit={handleSubmit}>
                    <header>
                        <div>
                            <img src={logoURL} alt="logo" />
                        </div>

                        <h1 className="section-1__form__header__text-1">
                            ПРИДУМАЙТЕ НОВЫЙ ПАРОЛЬ
                        </h1>

                        <p className="section-1__form__header__text-2">
                            Придумайте новый надежный пароль.
                        </p>
                    </header>

                    <section>
                        <div className="section-1__section__label-3">
                            <label htmlFor="new-password">Пароль</label>
                            <div className="section-1__section__label-3__password-container">
                                <div className="section-1__section__label-3__password-container__label-1">
                                    <input
                                        id="new-password"
                                        placeholder="Создайте пароль"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <img
                                        src={eyeClosedURL}
                                        alt="show-password-button"
                                        onClick={togglePasswordVisibility}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div>

                                <div className="section-1__section__label-3__password-container__label-2">
                                    <input
                                        id="confirm-password"
                                        placeholder="Подтвердите пароль"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                    <img
                                        src={eyeClosedURL}
                                        alt="show-password-button"
                                        onClick={toggleConfirmPasswordVisibility}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    <button type="submit">Завершить</button>
                </form>
            </div>

        </section>
        </>
    );
};



const PhoneVerification = ({ navigate, setVisiblePage }) => {
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const inputsRef = useRef([]);

    const handleChange = (value, index) => {
        if (!/^\d?$/.test(value)) return;  // Разрешаем только цифры

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < 5) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Код подтверждения:", code.join(''));
        setVisiblePage('ChangePassword');
    };

    return (
        <>

        <AuthAnimatedFrame />
        <section className="PhoneVerification-app-2">

            <div className="section-1">
                <form onSubmit={handleSubmit}>
                    <header>
                        <div>
                            <img src={logoURL} alt="logo" />
                        </div>

                        <h1 className="section-1__form__header__text-1">
                            <p> ВАМ БЫЛ ОТПРАВЛЕН </p>
                            <p> КОД ВОССТАНОВЛЕНИЯ </p>
                        </h1>
                        <span> 
                            <p className="section-1__form__header__text-2">
                                На указанный номер телефона был отправлен шестизначный код восстановления. Введите его для продолжения.
                            </p>

                        </span>

                    </header>

                    <section>
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={digit}
                                required
                                ref={el => inputsRef.current[index] = el}
                                onChange={(e) => handleChange(e.target.value, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                            />
                        ))}
                    </section>

                    <footer>
                        <button type="submit">Проверить</button>
                        <button type="button" 
                            onClick={() => setVisiblePage('LoginForm')}
                        >
                            Назад
                        </button>
                    </footer>
                </form>
            </div>

        </section>

        </>
    );
};


const RecoverAccount = ({ setVisiblePage }) => {
    const [contact, setContact] = useState('');

    const handleSubmitVerification = (contactValue) => {
        console.log("Восстановление для:", contactValue);
        // Здесь можно добавить вызов API или логику перехода
        setVisiblePage('PhoneVerification');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSubmitVerification(contact);
    };

    return (
        <> 
        <AuthAnimatedFrame />
        <section className="RecoverAccount-app">

            <div className="section-1">
                <form onSubmit={handleSubmit}>
                    <header>
                        <div>
                            <img src={logoURL} alt="logo" />
                        </div>

                        <h1 className='section-1__form__header__text-1'>
                            <p>ВОССТАНОВИТЕ </p>
                            <p>ДОСТУП К АККАУНТУ</p>
                        </h1>

                        <p className='section-1__form__header__text-2'>
                            С возвращением в Legal Ai.
                        </p>
                    </header>

                    <section>
                        <div className='section-1__section__label-1'>
                            <label htmlFor="recover-contact">Номер телефона или Email</label>
                            <input
                                id="recover-contact"
                                placeholder="Ваша электронная почта/номер тел."
                                type="text"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                required
                            />
                        </div>
                    </section>

                    <footer>
                        <button type="submit" className='section-1__footer__button-create-account'>
                            Отправить код восстановления
                        </button>
                        <button
                            type="button"
                            onClick={() => setVisiblePage('LoginForm')}
                            className="section-1__footer__button-back"
                        >
                            Назад
                        </button>
                    </footer>
                </form>
            </div>

        </section>

        </>
    );
};





const LoginForm = ({ navigate, setVisiblePage }) => {
    const [contact, setContact] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (email_or_username, passwordValue) => {
        try {
            const res = await axios.post('/api/login', null, {
                params: {
                    email_or_username,
                    password: passwordValue,
                },
            });

            console.log(res.data);
            localStorage.setItem('bearer_token', res.data.access_token);
            setVisiblePage('SuccessfulAuth');
        } catch (err) {
            console.log(err.message);
            alert('Неверный логин или пароль');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(contact, password);
    };

    return (
        <>
            <AuthAnimatedFrame />
            <section className="LoginForm-app">
                <div className="section-1">
                    <form onSubmit={handleSubmit}>
                        <header>
                            <div>
                                <img src={logoURL} alt="logo" />
                            </div>

                            <h1 className='section-1__form__header__text-1'>ВОЙДИТЕ В АККАУНТ</h1>
                            <p className='section-1__form__header__text-2'>С возвращением в Legal Ai.</p>
                        </header>

                        <section>
                            <div className='section-1__section__label-1'>
                                <label htmlFor="contact">Номер телефона или Email</label>
                                <input
                                    id="contact"
                                    placeholder="Ваша электронная почта/номер тел."
                                    type="text"
                                    value={contact}
                                    onChange={(e) => setContact(e.target.value)}
                                    required
                                />
                            </div>

                            <div className='section-1__section__label-2'>
                                <label htmlFor="password">Пароль</label>
                                <div className="password-container">
                                    <input
                                        id="password"
                                        placeholder="Введите пароль"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <img
                                        src={showPassword ? eyeOpenedURL : eyeClosedURL}
                                        alt="show-password-button"
                                        onClick={togglePasswordVisibility}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div>
                            </div>
                        </section>

                        <footer>
                            <button type="submit" className='section-1__footer__button-create-account'>
                                Вход в аккаунт
                            </button>

                            <span>Или</span>

                            <div>
                                <button type="button" onClick={() => navigate('/sign-up')}>
                                    Создать аккаунт
                                </button>

                                <button type="button" onClick={() => setVisiblePage('RecoverAccount')}>
                                    Восстановить пароль
                                </button>
                            </div>
                        </footer>
                    </form>

                    <div className='section-1__fast-login'>
                        <button type="button">
                            <img src={appleIconURL} alt="apple-icon" />
                            <span>Войти в Apple Account</span>
                        </button>

                        <button type="button">
                            <img src={googleIconURL} alt="google-icon" />
                            <span>Войти с Google</span>
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};





const MobileSignIn = () => {  
    const navigate = useNavigate()

    const { visiblePage, setVisiblePage } = useVisualStore()


    useEffect(() => {
        if (visiblePage !== 'RecoverAccount') setVisiblePage('LoginForm')
    }, [])


    return (

        <>
            {visiblePage === 'LoginForm' && <LoginForm navigate={navigate} setVisiblePage={setVisiblePage} /> }
            {visiblePage === 'RecoverAccount' && <RecoverAccount navigate={navigate} setVisiblePage={setVisiblePage} /> }
            {visiblePage === 'PhoneVerification' && <PhoneVerification navigate={navigate} setVisiblePage={setVisiblePage} /> }
            {visiblePage === 'ChangePassword' && <ChangePassword navigate={navigate} setVisiblePage={setVisiblePage} /> }
            {visiblePage === 'SuccessfulAuth' && <SuccessfulAuth navigate={navigate} setVisiblePage={setVisiblePage} /> }
        </>
    )
}

export default MobileSignIn