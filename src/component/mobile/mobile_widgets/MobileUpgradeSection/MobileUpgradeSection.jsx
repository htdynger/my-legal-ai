import './MobileUpgradeSection.css'

import AI_URL from '../../mobile_assets/AI.svg'
import showMoreURL from '../../mobile_assets/ShowMore.svg'
import character_1URL from '../../mobile_assets/character-1.png'

const MobileUpgradeSection = () => {

    return (

        <section className="section-upgrade">
            <header>
                <h1>
                    Leg <img src={AI_URL} alt="AI" /> Pro
                </h1>
                <h2>
                    <p>
                        РАСШИРЬТЕ СВОИ ВОЗМОЖНОСТИ С PRO
                    </p>
                    <p>
                        Раздвиньте границы с помощью расширенного доступа.
                    </p>
                </h2>

                <button>
                    <span> Оформить подписку </span> <img src={showMoreURL} alt=">" />
                </button>

            </header>

            <footer>
                <img src={character_1URL} alt="character" />
            </footer>

        </section>
    )
}

export default MobileUpgradeSection