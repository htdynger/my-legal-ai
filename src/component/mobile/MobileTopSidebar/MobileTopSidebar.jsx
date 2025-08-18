
import './MobileTopSidebar.css'


import logoURL from './item/logo.svg'

import quitURL from './item/quit.svg'
import redirectURL from './item/redirect.svg'
import settingsURL from './item/settings.svg'

const MobileTopSidebar = ({ isMobileTopSidebarOpened, setIsMobileTopSidebarOpened }) => {

    return (

        <>
        <div className={ isMobileTopSidebarOpened ? 'MobileTopSidebar MobileTopSidebar__fade-in-animation' : 'MobileTopSidebar MobileTopSidebar__fade-out-animation'}>

            <section>

                <div>
                    <img src={logoURL} alt="Legal AI" />
                    <h2> Добро пожаловать в Legal AI Beta </h2>
                    <h3>
                        Станьте одним из первых пользователей нейросети юриста.
                    </h3>
                </div>


                <div>
                    <i>
                        <img src={settingsURL} alt="" />
                    </i>
                    <p> Настройки </p>
                </div>


                <div>
                    <span>
                        <i> <img src={redirectURL} alt="" /> </i>
                        <p> Публичная оферта </p>
                    </span>


                    <span>
                        <i> <img src={redirectURL} alt="" /> </i>
                        <p> Условия и политика конфиденциальности </p>
                    </span>


                </div>


                <div>

                    <i>
                        <img src={quitURL} alt="" />
                    </i>
                    <p> Выйти </p>

                </div>
            </section>

            <div className='MobileTopSidebar__close-area' onClick={() => setIsMobileTopSidebarOpened(false)}>
                <span className='MobileTopSidebar__scroll'>
                    <svg width="70" height="5" viewBox="0 0 70 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="70" height="5" rx="2.5" fill="#373E4E"/>
                    </svg>

                </span>
            </div>





        </div>
        </>
    )
}

export default MobileTopSidebar