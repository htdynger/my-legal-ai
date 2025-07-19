

import logoURL from './item/logo.png'
import appleIconURL from './item/appleIcon.png'
import googleIconURL from './item/googleIcon.png'



import eyeClosedURL from './item/eyeClosed.png'
import eyeOpenedURL from './item/eyeClosed.png'

import './style/RegisterForm.css'
import './style/PhoneVerification.css'

import { useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'

import { useVisualStore } from '../../../store/useVisualStore'
import AuthAnimatedFrame from '../../../animation/AuthAnimatedFrame/AuthAnimatedFrame'
import SuccessfulAuth from '../../SuccessfulAuth/SuccessfulAuth.jsx'
const VITE_API_LEGAI = import.meta.env.VITE_API_LEGAI

import axios from 'axios'

const RegisterForm = ({ navigate, setVisiblePage }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    const register = async (data) => {
        try {
            const res = await axios.post(`api/accounts/register`, null, {
                params: {
                    email: data.email,
                    username: data.username,
                    password: data.password,
                },
            });

            console.log(res.data);
            navigate('/sign-in');
        } catch (err) {
            console.log(err.message);
        }
    };

    const handleCreateAccount = () => {
        if (formData.password !== formData.confirmPassword) {
            alert('Пароли не совпадают');
            return;
        }

        register(formData);
    };

    return (
        <> 
            <AuthAnimatedFrame />
            <section className="RegisterForm-app">
                <div className="section-1">
                    <form onSubmit={(e) => { e.preventDefault(); handleCreateAccount(); }}>
                        <header>
                            <div>
                                <img src={logoURL} alt="Legal AI logo" />
                            </div>
                            <h1 className="section-1__form__header__text-1">СОЗДАЙТЕ АККАУНТ</h1>
                            <p className="section-1__form__header__text-2">
                                Создайте аккаунт, благодаря которому сможете пользоваться Legal Ai.
                            </p>
                        </header>

                        <section>
                            <div className="section-1__section__label-1">
                                <label htmlFor="nickname">Никнейм</label>
                                <input
                                    id="nickname"
                                    placeholder="Ваше имя пользователя"
                                    type="text"
                                    required
                                    value={formData.username}
                                    onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                                />
                            </div>

                            <div className="section-1__section__label-2">
                                <label htmlFor="contact">Номер телефона или Email</label>
                                <input
                                    id="contact"
                                    placeholder="Ваша электронная почта/номер тел."
                                    type="text"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                />
                            </div>

                            <div className="section-1__section__label-3">
                                <label>Пароль</label>
                                <div className="section-1__section__label-3__password-container">
                                    <div className="section-1__section__label-3__password-container__label-1">
                                        <input
                                            id="password"
                                            placeholder="Создайте пароль"
                                            type={showPassword ? 'text' : 'password'}
                                            required
                                            value={formData.password}
                                            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                                        />
                                        <img
                                            src={showPassword ? eyeClosedURL : eyeClosedURL}
                                            alt="показать/скрыть пароль"
                                            onClick={() => setShowPassword(!showPassword)}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </div>

                                    <div className="section-1__section__label-3__password-container__label-2">
                                        <input
                                            id="confirmPassword"
                                            placeholder="Подтвердите пароль"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            required
                                            value={formData.confirmPassword}
                                            onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                        />
                                        <img
                                            src={showConfirmPassword ? eyeOpenedURL : eyeClosedURL}
                                            alt="показать/скрыть пароль"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <footer>
                            <button type="submit" className="section-1__footer__button-create-account">
                                Создать аккаунт
                            </button>
                            <span>Или</span>

                            <div>
                                <button type="button" onClick={() => navigate('/sign-in')}>
                                    Войти в аккаунт
                                </button>
                                {/* <button type="button" onClick={() => {
                                    navigate('/sign-in');
                                    setVisiblePage('RecoverAccount');
                                }}>
                                    Восстановить пароль
                                </button> */}
                            </div>
                        </footer>
                    </form>

                    {/* <div className="section-1__fast-login">
                        <button type="button">
                            <img src={appleIconURL} alt="Войти через Apple" />
                            <span>Войти в Apple Account</span>
                        </button>

                        <button type="button">
                            <img src={googleIconURL} alt="Войти через Google" />
                            <span>Войти с Google</span>
                        </button>
                    </div> */}
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
        setVisiblePage('SuccessfulAuth');
    };

    return (
        <>
        <AuthAnimatedFrame />
        <section className="PhoneVerification-app">


            <div className="section-1">
                <form onSubmit={handleSubmit}>
                    <header>
                        <div>
                            <img src={logoURL} alt="logo" />
                        </div>

                        <h1 className="section-1__form__header__text-1">
                            ПОДТВЕРДИТЕ НОМЕР ТЕЛЕФОНА
                        </h1>

                        <p className="section-1__form__header__text-2">
                            На указанный номер телефона был отправлен шестизначный код подтверждения.
                        </p>
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
                        <button type="button" onClick={() => setVisiblePage('RegisterForm')}>Назад</button>
                    </footer>
                </form>
            </div>

        </section>
        </>
    );
}; 


const MobileSignUp = () => {

    

    const navigate = useNavigate()

    const { visiblePage, setVisiblePage } = useVisualStore()


    useEffect(() => {
        setVisiblePage('RegisterForm')
    }, [])

    return (

        <>
            {visiblePage === 'RegisterForm' && <RegisterForm navigate={navigate} setVisiblePage={setVisiblePage} />} 
            {visiblePage === 'PhoneVerification' && <PhoneVerification navigate={navigate} setVisiblePage={setVisiblePage} />} 
            {visiblePage === 'SuccessfulAuth' && <SuccessfulAuth navigate={navigate} setVisiblePage={setVisiblePage} />} 
        </>
    )
}

export default MobileSignUp