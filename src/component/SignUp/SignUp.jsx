
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
import { useState } from 'react'

import SuccessfulAuth from '../SuccessfulAuth/SuccessfulAuth'


const RegisterForm = ({ navigate, setVisiblePage }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleCreateAccount = () => {
        setVisiblePage('PhoneVerification');
    };

    return (
        <section className="RegisterForm-app">
            <GradientCircle />

            <div className="section-1">
                <form action="" onSubmit={(e) => { e.preventDefault(); handleCreateAccount(); }}>
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
                            <label htmlFor="nickname">Никнейм</label>
                            <input id="nickname" placeholder="Ваше имя пользователя" type="text" required />
                        </div>

                        <div className="section-1__section__label-2">
                            <label htmlFor="contact">Номер телефона или Email</label>
                            <input id="contact" placeholder="Ваша электронная почта/номер тел." type="text" required />
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
                            <button type="button">
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
    );
};


const PhoneVerification = ({ navigate, setVisiblePage }) => {

    const handlePhoneVerification = () => {

        if (true) {
            setVisiblePage('SuccessfulAuth')
        }
    }

    return (

        <section className='PhoneVerification-app'>
            <GradientCircle />

            <div className='section-1'>
                <form action="">

                    <header>
                        <div>
                            <img src={logoURL} alt="logo" />
                        </div>

                        <span className='section-1__form__header__text-1'> 
                            ПОДТВЕРДИТЕ НОМЕР ТЕЛЕФОНА
                        </span>

                        <span className='section-1__form__header__text-2'>
                            <p> На указанный номер телефона был отправлен </p>
                            <p> шестизначный код подтверждения. </p>
                        </span>

                    </header>

                    <section>

                       <input type="text" maxLength="1" inputMode="numeric" pattern="[0-9]*" />
                       <input type="text" maxLength="1" inputMode="numeric" pattern="[0-9]*" />
                       <input type="text" maxLength="1" inputMode="numeric" pattern="[0-9]*" />
                       <input type="text" maxLength="1" inputMode="numeric" pattern="[0-9]*" />
                       <input type="text" maxLength="1" inputMode="numeric" pattern="[0-9]*" />
                       <input type="text" maxLength="1" inputMode="numeric" pattern="[0-9]*" />

                    </section>

                    <footer>
                        <button onClick={() => handlePhoneVerification()}> Проверить </button>
                        <button onClick={() => setVisiblePage('RegisterForm')}> Назад </button>
                    </footer>

                </form>




            </div>

            <div className='section-2'>
                <img src={character_2URL} alt="" />
            </div>

            <span className='all-rights-reserved'>
                Условия и политика конфиденциальности
            </span>
        </section>
    )
}


const SignUp = () => {

    const navigate = useNavigate()

    const [visiblePage, setVisiblePage] = useState('RegisterForm')

    return (

        <>
            {visiblePage === 'RegisterForm' && <RegisterForm navigate={navigate} setVisiblePage={setVisiblePage} />} 
            {visiblePage === 'PhoneVerification' && <PhoneVerification navigate={navigate} setVisiblePage={setVisiblePage} />} 
            {visiblePage === 'SuccessfulAuth' && <SuccessfulAuth navigate={navigate} setVisiblePage={setVisiblePage} />} 
        </>
    )
}

export default SignUp