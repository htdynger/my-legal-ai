import './MobileNavSection.css'

import homeIconURL from './item/homeIcon.png'
import hyperTextIconURL from './item/hyperTextIcon.png'
import infoBlockIconURL from './item/infoBlockIcon.png'
import logOutIconURL from './item/logOutIcon.png'
import proIconURL from './item/proIcon.png'
import settingsIconURL from './item/settingsIcon.png'

import logoURL from './item/logo.png'

const MobileNavSection = () => {

    return (

        <nav className='nav-515'>
            <section>
                <div>
                    <button><img src={homeIconURL} alt="chat-button" /><span> Чат </span></button>
                </div>

                <div>
                    <button><img src={infoBlockIconURL} alt="infoblock-button" /><span> Инфоблок </span></button>
                </div>

                <div>
                    <button><img src={proIconURL} alt="pro-button" /><span> Обновить план </span></button>
                </div>

                <div>
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