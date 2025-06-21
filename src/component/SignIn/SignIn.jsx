
import character_1URL from './item/character-1.png'
import character_2URL from './item/character-2.png'
import character_3URL from './item/character-2.png'

import logoURL from './item/logo.png'
import appleIconURL from './item/appleIcon.png'
import googleIconURL from './item/googleIcon.png'

import eyeClosedURL from './item/eyeClosed.png'

import GradientCircle from '../../animation/GradientCircle/GradientCircle'
import './style/LoginForm.css'
import './style/RecoverAccount.css'
import './style/PhoneVerification.css'
import './style/ChangePassword.css'
import './SignIn.css'

import SuccessfulAuth from '../SuccessfulAuth/SuccessfulAuth'


const ChangePassword = () => {

    return (

        <> 


        
            <section className="ChangePassword-app">
            <GradientCircle />

                <div className="section-1">
                    <form action=""> 

                        <header>

                            <div>
                                <img src={logoURL} alt="logo" />
                            </div>

                            <span className='section-1__form__header__text-1'> 
                                ПРИДУМАЙТЕ НОВЫЙ ПАРОЛЬ
                            </span>

                            <span className='section-1__form__header__text-2'>
                                <p> Придумайте новый надежный пароль. </p>
                            </span>
                        </header>


                        <section>

                            <div className='section-1__section__label-3'>
                                <label htmlFor=""> Пароль </label>
                                <div className='section-1__section__label-3__password-container'>

                                    <div className='section-1__section__label-3__password-container__label-1'>
                                        <input placeholder='Создайте пароль' type="text" />
                                        <img src={eyeClosedURL} alt="show-password-button" />
                                    </div>

                                    <div className='section-1__section__label-3__password-container__label-2'>
                                        <input placeholder='Подтвердите пароль' type="text" />
                                        <img src={eyeClosedURL} alt="show-password-button" />
                                    </div>

                                </div>

                            </div>

                        </section>

                        <button> Завершить </button>

                    </form>

                    
                </div>

                <div className="section-2"> 
                    <img src={character_3URL} alt="" />
                </div>

                <span className='all-rights-reserved'>
                    Условия и политика конфиденциальности
                </span>

            </section>



        </>
        
    )
}



const PhoneVerification = () => {

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
                            <p> ВАМ БЫЛ ОТПРАВЛЕН КОД </p>
                            <p> ВОССТАНОВЛЕНИЯ </p>
                        </span>

                        <span className='section-1__form__header__text-2'>
                            <p> На указанный номер телефона был отправлен </p>
                            <p> шестизначный код подтверждения. Введите его для </p>
                            <p> продолжения. </p>

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
                        <button> Проверить </button>
                        <button> Назад </button>
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


const RecoverAccount = () => {

    return (

        <> 


        
            <section className="RecoverAccount-app">
            <GradientCircle />

                <div className="section-1">
                    <form action=""> 

                        <header>

                            <div>
                                <img src={logoURL} alt="logo" />
                            </div>

                            <span className='section-1__form__header__text-1'> 
                                <p> ВОССТАНОВИТЕ ДОСТУП</p>
                                <p> К АККАУНТУ </p>
                            </span>

                            <span className='section-1__form__header__text-2'>
                                <p> С возвращением в Legal Ai. </p>
                            </span>
                        </header>


                        <section>
                            <div className='section-1__section__label-1'>
                                <label htmlFor=""> Номер телефона или Email </label>
                                <input placeholder='Ваша электронная почта/номер тел.' type="text" />
                            </div>
                        </section>

                        <footer>
                            <button className='section-1__footer__button-create-account'> Отправить код восстановления </button>
                            <span> Назад </span>
                        </footer>

                    </form>
                </div>


                <div className="section-2"> 
                    <img src={character_1URL} alt="" />
                </div>

                <span className='all-rights-reserved'>
                    Условия и политика конфиденциальности
                </span>

            </section>



        </>
        
    )
}




const LoginForm = () => {

    return (

        <> 


        
            <section className="LoginForm-app">
            <GradientCircle />

                <div className="section-1">
                    <form action=""> 

                        <header>

                            <div>
                                <img src={logoURL} alt="logo" />
                            </div>

                            <span className='section-1__form__header__text-1'> 
                                ВОЙДИТЕ В АККАУНТ
                            </span>

                            <span className='section-1__form__header__text-2'>
                                <p> С возвращением в Legal Ai. </p>
                            </span>
                        </header>


                        <section>

                            <div className='section-1__section__label-1'>
                                <label htmlFor=""> Номер телефона или Email </label>
                                <input placeholder='Ваша электронная почта/номер тел.' type="text" />
                            </div>

                            <div className='section-1__section__label-2'>
                                <label htmlFor=""> Пароль </label>

                                <div>
                                    <input placeholder='Введите пароль' type="text" />
                                    <img src={eyeClosedURL} alt="show-password-button" />
                                </div>
                            </div>


                        </section>

                        <footer>
                            <button className='section-1__footer__button-create-account'> Вход в аккаунт </button>
                            <span> Или </span>

                            <div>
                                <button>
                                    Создать аккаунт
                                </button>

                                <button>
                                    Восстановить пароль
                                </button>
                            </div>
                        </footer>

                    </form>

                    <div className='section-1__fast-login'>

                        <button>
                            <img src={appleIconURL} alt="apple-icon" />
                            <span> Войти в Apple Account </span>
                        </button>

                        <button>
                            <img src={googleIconURL} alt="google-icon" />
                            <span> Войти с Google </span>
                        </button>

                    </div>
                    
                </div>

                <div className="section-2"> 
                    <img src={character_1URL} alt="" />
                </div>

                <span className='all-rights-reserved'>
                    Условия и политика конфиденциальности
                </span>

            </section>



        </>
        
    )
}




const SignIn = () => {

    return (

        <>
            <LoginForm />
            <RecoverAccount />
            <PhoneVerification />
            <ChangePassword />

        </>
    )
}

export default SignIn