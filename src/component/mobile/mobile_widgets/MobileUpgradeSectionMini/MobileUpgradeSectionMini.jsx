
import showMoreURL from '../../mobile_assets/showMore.svg'
import AI_URL from '../../mobile_assets/AI.svg'
import './MobileUpgradeSectionMini.css'
const MobileUpgradeSectionMini = () => {

    return (

        
        <section className='section-upgrade-mini'>

            <div>
                <p> Leg </p> 
                <img src={AI_URL} alt="AI" />
                <p> Pro </p>
            </div>

            <span>

                <h1>
                    <p>РАСШИРЬТЕ СВОИ</p>
                    <p>ВОЗМОЖНОСТИ С</p>
                    <p>PRO</p>
                </h1>

                <h2>
                    <p>Раздвиньте границы с помощью</p>
                    <p>расширенного доступа.</p>
                </h2>

            </span>

            <button>
                <span> Оформить подписку </span>
                <img src={showMoreURL} alt="show-more" />
            </button>

        </section>
    )
}

export default MobileUpgradeSectionMini