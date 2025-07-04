
import './MobileAccountHeaderSection.css'
import accountHeaderURL from '../../mobile_assets/accountHeader.svg'
const MobileAccountHeaderSection = () => {

    return (

        <>
            <section className='section-account-header'>
                
                <header>
                    <img src={accountHeaderURL} alt="" />
                </header>

                <aside>

                    <div>
                        <h1> TSKHAI </h1>
                        <h2> EXPLORER MAN-KIND MIND COLOR </h2>
                    </div>

                    <span>
                        <div>

                            Впервые в Legal AI <strong> 20.20.2020 </strong>
                        </div>
                    </span>

                </aside>
            </section>
        </>
    )
}

export default MobileAccountHeaderSection