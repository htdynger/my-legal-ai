
import logoURL from './item/logo.png'
import './SuccessfulAuth.css'
import character_1URL from './item/character-1.png'
// import GradientCircle from '../../animation/GradientCircle.jsx'
import GradientCircle from '../../animation/GradientCircle/GradientCircle'
import AuthAnimatedFrame from '../../animation/AuthAnimatedFrame/AuthAnimatedFrame'
import { useNavigate } from 'react-router-dom'

const SuccessfulAuth = () => {

    const navigate = useNavigate()
    return (
        <>
            <AuthAnimatedFrame />

        <section className='SuccessfulAuth-app'>
            <GradientCircle />

            <div className='section-1'>


                    <article>
                        <div>
                            <img src={logoURL} alt="logo" />
                        </div>

                        <span className='section-1__form__header__text-1'> 
                            ДОБРО ПОЖАЛОВАТЬ В LEGAL AI
                        </span>

                        <span className='section-1__form__header__text-2'>
                            Lorem ipsum dolor sit lorem ipsum dolor sit
                            lorem ipsum dolor sit lorem. 
                        </span>

                        <button type='button' onClick={() => navigate('/')}> Погрузиться </button>

                    </article>


            </div>

            <div className='section-2'>
                <img src={character_1URL} alt="" />
            </div>

            <span className='all-rights-reserved'>
                Условия и политика конфиденциальности
            </span>
        </section>

        
        </>
    )
}

export default SuccessfulAuth