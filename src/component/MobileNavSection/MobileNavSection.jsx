import './MobileNavSection.css'

import homeIconURL from './item/homeIcon.png'
import hyperTextIconURL from './item/hyperTextIcon.png'
import infoBlockIconURL from './item/infoBlockIcon.png'
import logOutIconURL from './item/logOutIcon.png'
import proIconURL from './item/proIcon.png'
import settingsIconURL from './item/settingsIcon.png'

import logoURL from './item/logo.png'

import { useNavigate, useLocation } from 'react-router-dom'

const MobileNavSection = () => {

    const location = useLocation()
    const navigate = useNavigate()

    return (

        <nav className='nav-515'>
            <section>
                <div className={location.pathname === '/' ? 'nav-515-selected' : ''}>
                    <button><img src={homeIconURL} alt="chat-button" /><span> Чат </span></button>
                </div>

                <div className={location.pathname === '/info' ? 'nav-515-selected' : ''}>
                    <button><img src={infoBlockIconURL} alt="infoblock-button" /><span> Инфоблок </span></button>
                </div>

                <div className={location.pathname === '/pro' ? 'nav-515-selected' : ''}>
                    <button><img src={proIconURL} alt="pro-button" /><span> Обновить план </span></button>
                </div>

                <div className={location.pathname === '/settings' ? 'nav-515-selected' : ''}>
                    <button><img src={settingsIconURL} alt="settings-icon" /><span> Настройки </span></button>
                </div>
            </section>

            <section>
                <div>
                    <button><img src={hyperTextIconURL} alt="public" /><span> Публичная оферта </span></button>
                </div>

                <div>
                    <button><img src={hyperTextIconURL} alt="legal" /><span> Условия и политика конфеденциальности </span></button>
                </div>
            </section>

            <section>
                <div>
                    <button><img src={logOutIconURL} alt="log-out-button" /><span> Выйти </span></button>
                </div>
            </section>

            <div className='nav-515__logo-container'>
                <img src={logoURL} alt="logo" />
            </div>
        </nav>
    )
}

export default MobileNavSection