
import './MobileSettingsPageLayout.css'
import showLessURL from '../../mobile_assets/grayShowLess.svg'
import SettingsAnimatedFrame from '../../../../animation/SettingsAnimatedFrame/SettingsAnimatedFrame'

import { useNavigate } from 'react-router-dom'

const MobileSettingsPageLayout = ({ children, headerText, mainTitle, mainText }) => {

    const navigate = useNavigate()
    return (

        <>
            <section className='settings-page-layout'>

                <header className='settings-page-layout__header'>
                    <button onClick={() => navigate('/settings')}> <img src={showLessURL} alt="back" /> </button>
                    <span> {headerText} </span>
                </header>

                <main>

                    <div>
                        <h1> {mainTitle} </h1>
                        <p> {mainText} </p>
                    </div>

                    {children}

                    
                </main>

                <footer>
                    <SettingsAnimatedFrame />
                </footer>
            </section>
        </>
    )
}

export default MobileSettingsPageLayout