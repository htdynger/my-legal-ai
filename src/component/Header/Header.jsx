import legAiLogo1URL from './items/legAiLogo1.png'
import legAiText1URL from './items/legAiText1.png'
import legAiProLogo1URL from './items/legAiProLogo1.png'
import navHomeButtonLogoURL from './items/navHomeButtonLogo.png'
import navSearchButtonLogoURL from './items/navSearchButtonLogo.png'
import navSettingsButtonLogoURL from './items/navSettingsButtonLogo.png'
import userButtonLogoURL from './items/userButtonLogo.png'
import navHomeButtonLogoSelectedURL from './items/navHomeButtonLogoSelected.png'

import toggleSidebarButtonURL from './items/sidebar/toggleSidebarButton.png'
import newChatButtonURL from './items/sidebar/newChatButton.png'
import rightButtonURL from './items/sidebar/rightButton.png'
import leftButtonURL from './items/sidebar/leftButton.png'

import navBoxesButtonLogoURL from './items/navBoxesButtonLogo.png'
import navPenButtonLogoURL from './items/navPenButtonLogo.png'
import navProButtonLogoURL from './items/navProButtonLogo.png'

import { useVisualStore } from '../../store/useVisualStore'
import { useNavigate, useLocation } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'

import './Header.css'

import './1440.css'

import { useChatStore } from '../../store/useChatStore'

const Header = () => {

    const navigate = useNavigate()
    const { unSelectChat } = useChatStore()


    const mainButtonRef = useRef()
    const documentGenerationButtonRef = useRef()
    const infoButtonRef = useRef()
    const proButtonRef = useRef()


    const location = useLocation()
    
    const sidebarAddNewChatButtonRef = useRef()


    const [mainIconURL, setMainIconURL] = useState(navHomeButtonLogoSelectedURL)

    useEffect(() => {
        location.pathname === '/' ? setMainIconURL(navHomeButtonLogoSelectedURL) : setMainIconURL(navHomeButtonLogoURL)
    }, [location.pathname])
    
    const buttonRefs = [mainButtonRef, documentGenerationButtonRef]

    const { visualPathname, setVisualPathname } = useVisualStore()
    const { isSidebarHidden, toggleSidebar, closeChat, isChatOpened, setChatInstantEnabled, windowLayout } = useVisualStore()
    



    
    const handleNavigate = (path, buttonHasClicked) => {

        navigate(path)

        if (location.pathname === '/' && path === '/') {

            addNewChat()

        } else if (location.pathname === path) {
            return
        }  else {
            closeChat()
            unSelectChat()
            setChatInstantEnabled(false)
        }
        
       



        // buttonRefs.forEach((e) => {
        //     e.current.classList.remove('navSelected')
        // })
        // buttonHasClicked.current.classList.add('navSelected')
        // buttonHasClicked === mainButtonRef ? setMainIconURL(navHomeButtonLogoSelectedURL) : setMainIconURL(navHomeButtonLogoURL)

    }

    

    const addNewChat = () => {

        if (!isChatOpened) return
        // disablePointerEvents(1000)
        
        setChatInstantEnabled(false)
        setTimeout(() => {
        unSelectChat()
        closeChat()}, 500)

    }

    const handleAddNewChatClick = () => {

        addNewChat()
        handleNavigate('/', mainButtonRef)
        
    }



    useEffect(() => {
        setVisualPathname(location.pathname)
    }, [location.pathname])

    return (
        <>

            {windowLayout.width > 1440 && 
            <> 
                <div className="relative"></div>
                <div className="header-fixed-container">
                    <header className='header'>
                        <div className='header__column-n1'>

                            <div className='container'>

                                <div className='header__column-n1__logo-container'>
                                    <img src={legAiLogo1URL} alt="logo" />
                                </div>


                                <div className='header__column-n1__legAi-container'> 
                                    <p>Leg</p>
                                    <img src={legAiText1URL} alt='ai' />
                                </div>

                                <div className='header__column-n1__pro-container'> <p> Pro </p>  </div>

                            </div>




                            <div className={isSidebarHidden ? 'sidebar-closed openedSidebar' : 'sidebar-closed closedSidebar'}>
                                <button onClick={toggleSidebar}><img className='button-icon-n1' src={toggleSidebarButtonURL} alt="toggle-sidebar-button" /></button>

                                <button ref={sidebarAddNewChatButtonRef} onClick={() => handleAddNewChatClick()}><img className='button-icon-n2' src={newChatButtonURL} alt="new-chat-button" /></button>

                                <button><img className='button-icon-n3' src={leftButtonURL} alt="left-button-icon" /></button>

                                <button><img className='button-icon-n4' src={rightButtonURL} alt="right-button-icon" /></button>
                            </div>



                        </div>

                        

                        

                        <nav className='header__column-n2'>

                            <div className='header__column-n2__container-n1'>
                                <button className={visualPathname === '/' ? 'navSelected' : ''} ref={mainButtonRef} onClick={() => handleNavigate('/', mainButtonRef)}> <img src={mainIconURL} /></button>
                            </div>

                            <div className='header__column-n2__container-n2'>

                                <div className={visualPathname === '/info/' ? 'navSelected' : ''} ref={infoButtonRef} onClick={() => handleNavigate('/info/', infoButtonRef)}> <button className='header__column-n2__container-n2__button-text-n1'> <img src={navBoxesButtonLogoURL} alt="Info" /> </button> </div>
                                <div className={visualPathname === '/pro/' ? 'navSelected' : ''} ref={proButtonRef} onClick={() => handleNavigate('/pro/', proButtonRef)}> <button className='header__column-n2__container-n2__button-text-n2'> <img src={navProButtonLogoURL} alt="Pro-Version" /> </button> </div>
                                <div className={visualPathname === '/document-generation/' ? 'navSelected' : ''} ref={documentGenerationButtonRef} onClick={() => handleNavigate('/document-generation/', documentGenerationButtonRef)}> <button className='header__column-n2__container-n2__button-text-n3'> <img src={navPenButtonLogoURL} alt="document-generation" /> </button> </div>

                                <div> <button className='header__column-n2__container-n2__button-img-n1'> <img className='header__column-h2__container-n2__button-img-n1__logo' src={navSearchButtonLogoURL} alt="search-button-logo" /> </button> </div>

                            </div>
                        </nav>

                        <div className='header__column-n3'>

                            <button><img src={userButtonLogoURL} alt="user-button-logo" /></button>

                        </div>
                    </header>
                </div>
                

            </>}


            {windowLayout.width > 515 && windowLayout.width <= 1440 && 
            <>

                <div className='relative'></div>

                <header className='header-fixed-container'> 
                    <section className='header-1440'>
                        <nav className='header-1440__nav'>
                            <div className='header-1440__nav__column-1'> 
                                <div className={visualPathname === '/' ? 'navSelected' : ''}><button ref={mainButtonRef} onClick={() => handleNavigate('/', mainButtonRef)}> <img src={legAiLogo1URL} /></button></div>
                                <div onClick={() => toggleSidebar(!isSidebarHidden)}><button><img src={toggleSidebarButtonURL} alt="toggle-sidebar-button" /></button></div>
                            </div>

                            <div className='header-1440__nav__column-2'>
                                {/* <div><button><img src={legAiLogo1URL} alt="logo-button" /></button></div> */}
                                <div className={visualPathname === '/document-generation/' ? 'navSelected' : ''} ref={documentGenerationButtonRef} onClick={() => handleNavigate('/document-generation/', documentGenerationButtonRef)}><button><img src={navPenButtonLogoURL} alt="document-generation-button" /></button></div>
                                <div className={visualPathname === '/info/' ? 'navSelected' : ''} ref={infoButtonRef} onClick={() => handleNavigate('/info/', infoButtonRef)}><button><img src={navBoxesButtonLogoURL} alt="info-button" /></button></div>
                                <div className={visualPathname === '/pro/' ? 'navSelected' : ''} ref={proButtonRef} onClick={() => handleNavigate('/pro/', proButtonRef)}><button><img src={navProButtonLogoURL} alt="pro-button" /></button></div>
                                <div><button><img src={navSearchButtonLogoURL} alt="search-button" /></button></div>
                                <div><button><img src={userButtonLogoURL} alt="user-button" /></button></div>
                            </div>
                        </nav>
                    </section>
                </header>


            </>

            }

        </>
    )
}

export default Header 