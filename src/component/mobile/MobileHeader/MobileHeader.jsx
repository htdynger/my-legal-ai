
import './MobileHeader.css'

import toggleSidebarURL from './item/toggleSidebar.svg'
import logoURL from './item/logo.svg'

import { useVisualStore } from '../../../store/useVisualStore'
const MobileHeader = ({ title, setIsMobileTopSidebarOpened, isMobileTopSidebarOpened }) => {

    const { setIsMobileSidebarHidden, isMobileSidebarHidden } = useVisualStore()

    return (

        <>
            <header className='MobileHeader'>
                <button onClick={() => setIsMobileSidebarHidden(!isMobileSidebarHidden)}>
                    <img style={{transform: isMobileSidebarHidden ? `rotate(0deg)` : `rotate(-180deg)`, transition: `all 0.4s`}} src={toggleSidebarURL} alt=">" />
                    
                </button>

                <h2>
                    {title}
                    {/* {isMobileSidebarHidden} */}
                </h2>

                <button onClick={() => setIsMobileTopSidebarOpened(!isMobileTopSidebarOpened)}>
                    <img src={logoURL} alt="" />
                </button>
            </header>
        </>
    )
}

export default MobileHeader