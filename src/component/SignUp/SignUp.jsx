
import character_1URL from './item/character-1.png'
import character_2URL from './item/character-2.png'

import logoURL from './item/logo.png'
import appleIconURL from './item/appleIcon.png'
import googleIconURL from './item/googleIcon.png'

import eyeClosedURL from './item/eyeClosed.png'
import eyeOpenedURL from './item/eyeClosed.png'

import GradientCircle from '../../animation/GradientCircle/GradientCircle'
import './style/RegisterForm.css'
import './style/PhoneVerification.css'
import './SignUp.css'

import { useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'

import SuccessfulAuth from '../SuccessfulAuth/SuccessfulAuth'

import { useVisualStore } from '../../store/useVisualStore'

import AuthAnimatedFrame from '../../animation/AuthAnimatedFrame/AuthAnimatedFrame'

import axios from 'axios'


const RegisterForm = ({ navigate, setVisiblePage }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // const [inputUsername, setInputUsername] = useState('')
    // const [inputEmail, setInputEmail] = useState('')
    // const [inputPassword, setInputPassword] = useState('')

    // const [inputConfirmPassword, setInputConfirmPassword] = useState('')

    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    })

    // useEffect(() => {
    //     setFormData({
    //         email: inputEmail,
    //         username: inputUsername,
    //         password: inputPassword,
    //     })
    // }, [inputEmail, inputUsername, inputPassword])

    const register = async (data) => {

        try {
            const res = await axios.post('/api/register', null, {
                params: {
                    email: data.email,
                    username: data.username,
                    password: data.password,
                },
            })

            console.log(res.data)
            navigate('/sign-in')
            // setVisiblePage('SuccessfulAuth');
        } catch (err) {

            console.log(err.message)
        }
    }

    const handleCreateAccount = (inputData) => {
        if (inputData.password !== inputData.confirmPassword) {
            alert('пароли не совпадают')
            return
        }
        register(inputData)


    };

    return (
        <> 
        <AuthAnimatedFrame />
        <section className="RegisterForm-app">
            <GradientCircle />

            <div className="section-1">
                <form action="" onSubmit={(e) => { e.preventDefault(); handleCreateAccount(formData); }}>
                    <header>
                        <div>
                            <img src={logoURL} alt="Legal AI logo" />
                        </div>

                        <h1 className="section-1__form__header__text-1">
                            СОЗДАЙТЕ АККАУНТ
                        </h1>

                        <p className="section-1__form__header__text-2">
                            Создайте аккаунт, благодаря которому сможете пользоваться Legal Ai.
                        </p>
                    </header>

                    <section>
                        <div className="section-1__section__label-1">
                            <label htmlFor="Username">Никнейм</label>
                            <input onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))} value={formData.username} id="Username" placeholder="Ваше имя пользователя" type="text" required />
                        </div>

                        <div className="section-1__section__label-2">
                            <label htmlFor="contact">Номер телефона или Email</label>
                            <input onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} value={formData.email} id="contact" placeholder="Ваша электронная почта/номер тел." type="text" required />
                        </div>

                        <div className="section-1__section__label-3">
                            <label>Пароль</label>
                            <div className="section-1__section__label-3__password-container">

                                <div className="section-1__section__label-3__password-container__label-1">
                                    <input
                                        id="password"
                                        placeholder="Создайте пароль"
                                        type={showPassword ? 'text' : 'password'}
                                        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                                        value={formData.password}
                                        required
                                    />
                                    <img
                                        src={showPassword ? eyeOpenedURL : eyeClosedURL}
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
                                        onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                        value={formData.confirmPassword}
                                        required
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
                            <button type="button" onClick={() => {navigate('/sign-in'); setVisiblePage('RecoverAccount')}}>
                                Восстановить пароль
                            </button>
                        </div>
                    </footer>
                </form>

                <div className="section-1__fast-login">
                    <button type="button">
                        <img src={appleIconURL} alt="Войти через Apple" />
                        <span>Войти в Apple Account</span>
                    </button>

                    <button type="button">
                        <img src={googleIconURL} alt="Войти через Google" />
                        <span>Войти с Google</span>
                    </button>
                </div>
            </div>

            <div className="section-2">
                <img src={character_1URL} alt="Персонаж" />
            </div>

            <span className="all-rights-reserved">
                Условия и политика конфиденциальности
            </span>
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
            <GradientCircle />

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

            <div className="section-2">
                <img src={character_2URL} alt="Персонаж" />
            </div>

            <span className="all-rights-reserved">
                Условия и политика конфиденциальности
            </span>
        </section>
        </>
    );
}; 


const SignUp = () => {

    

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

export default SignUp