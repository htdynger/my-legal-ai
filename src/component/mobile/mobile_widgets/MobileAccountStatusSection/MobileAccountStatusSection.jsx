
import './MobileAccountStatusSection.css'
import refreshIconURL from '../../mobile_assets/refresh.svg'
import AI_URL from '../../mobile_assets/AI.svg'
const MobileAccountStatusSection = () => {

    return (

        <>
            <section className='section-account-status'>
                <header>
                    vladimirtsay08@gmail.com 
                </header>

                <aside>
                    <div>
                        <span> Leg <img src={AI_URL} alt="AI" /> Pro </span>
                        <p> Действует до: 15 октября 2025г. </p>
                    </div>

                    <button>
                        <img src={refreshIconURL} alt="refresh" />
                        <span> Продлить </span>
                    </button>
                </aside>
            </section>
        </>
    )
}

export default MobileAccountStatusSection