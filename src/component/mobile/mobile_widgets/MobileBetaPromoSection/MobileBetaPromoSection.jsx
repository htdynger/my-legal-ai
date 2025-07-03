
import './MobileBetaPromoSection.css'
import showMoreURL from '../../mobile_assets/showMore.svg'
import character_2URL from '../../mobile_assets/character-2.png'

const MobileBetaPromoSection = () => {

    return (

        <section className='section-beta-promo'>
            <div className='section-beta-promo__content'>

                <div>

                    <h1>
                        <p>LEG AI BETA: ДОБРО</p>
                        <p>ПОЖАЛОВАТЬ В</p>
                        <p>БЕТА ТЕСТ</p>
                    </h1>

                    <span>
                        <p>Станьте одним из первых</p>
                        <p>пользователей нейросети юриста</p>
                    </span>

                    <button>
                        <span> Подробнее </span>
                        <img src={showMoreURL} alt="show-more" />
                    </button>

                </div>


            </div>

            <div className='section-beta-promo__img'>
                <img src={character_2URL} alt="character" />
            </div>

        </section>
    )
}

export default MobileBetaPromoSection