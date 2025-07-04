
import './MobileAccountOptionsSection.css'
import showMoreURL from '../../mobile_assets/grayShowMore.svg'

import icon_1URL from './item/icon-1.svg'
import icon_2URL from './item/icon-2.svg'
import icon_3URL from './item/icon-3.svg'
const MobileAccountOptionsSection = () => {

    return (

        <>
            <section className='section-account-options'>

                <section>
                    <div><img src={icon_1URL} alt="" /></div>
                    <span> Аккаунт и данные </span>
                    <button> <img src={showMoreURL} alt="refirect" /> </button>
                </section>

                <section>
                    <div><img src={icon_2URL} alt="" /></div>
                    <span> LegAI Pro подписка </span>
                    <button> <img src={showMoreURL} alt="refirect" /> </button>
                </section>

                <section>
                    <div><img src={icon_3URL} alt="" /></div>
                    <span> Выйти из аккаунта </span>
                    <button> <img src={showMoreURL} alt="refirect" /> </button>
                </section>

            </section>
        </>
    )
}

export default MobileAccountOptionsSection